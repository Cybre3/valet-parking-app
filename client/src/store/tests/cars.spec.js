import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import configureStore from '../configureStore';
import { addCar, getCarByPhoneMakeModel, loadCars } from '../cars';

describe('carsSlice', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const carsSlice = () => store.getState().entities.cars;

    const createState = () => ({
        entities: {
            cars: {
                list: [],
            }
        }
    });

    describe('loading cars', () => {
        describe('if cars do not exist in cache', () => {
            it('Should fetch all cars from server and populate the store', async () => {
                fakeAxios.onGet('/cars').reply(200, [{ id: 1 }, { id: 2 }]);

                await store.dispatch(loadCars());

                expect(carsSlice().list).toHaveLength(2);
            });

            describe('Loading Indicator', () => {
                it('Should be true while fetching cars', async () => {
                    let loading;
                    fakeAxios.onGet('/cars').reply(() => {
                        loading = carsSlice().loading;
                        return 200, [{ id: 1 }]
                    })

                    await store.dispatch(loadCars());

                    expect(loading).toBe(true);
                });

                it('should be false after fetching cars', async () => {
                    fakeAxios.onGet('/cars').reply(200, [{ id: 1 }]);

                    await store.dispatch(loadCars());

                    expect(carsSlice().loading).toBe(false);
                });
            })
        })
    });

    it('Should add car to the store if it is saved to the server', async () => {
        const car = { description: 'a' };
        const savedCar = { ...car, id: 1 };
        fakeAxios.onPost('/cars').reply(200, savedCar);

        await store.dispatch(addCar(car));

        expect(carsSlice().list).toContainEqual(savedCar);
    });

    it('Should not add car to server or store if duplicate car is submitted', async () => {
        const car1 = { description: 'a' };
        const car2 = { description: 'a' };
        const savedCar1 = { ...car1, id: 1 };
        const savedCar2 = { ...car2, id: 1 };

        fakeAxios.onPost('/cars').reply(200, savedCar1);        
        await store.dispatch(addCar(car1));

        fakeAxios.onPost('/cars').reply(400, savedCar2);
        await store.dispatch(addCar(car2));

        await store.dispatch(loadCars());

        expect(carsSlice().list).toHaveLength(1);
    })

    it('Should return the saved car from submition after added to the server and store - comparison made from store', async () => {
        const car1 = { description: 'a' };
        const car2 = { description: 'b' };
        const savedCar1 = { ...car1, id: 1 };
        const savedCar2 = { ...car2, id: 2 };
        fakeAxios.onPost('/cars').reply(200, savedCar1);
        fakeAxios.onPost('/cars').reply(200, savedCar2);

        await store.dispatch(addCar(car1));
        await store.dispatch(addCar(car2));
        await store.dispatch(loadCars());

        const [currentCar] = getCarByPhoneMakeModel(car2)(store.getState());
        expect(currentCar).toEqual(savedCar2);
    });
});