import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import _ from 'lodash';
// import moment from "moment/moment";


// Reducer
const slice = createSlice({
    name: 'cars',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
    },
    reducers: {
        loading: (cars, action) => {
            cars.loading = true;
        },

        carsRequested: (cars, action) => {
            cars.loading = true;
        },

        carsRequestFailed: (cars, action) => {
            cars.loading = false;
        },

        carsReceived: (cars, action) => {
            cars.list = action.payload
            cars.loading = false;
            cars.lastFetch = Date.now();
        },

        carAdded: (cars, action) => {
            cars.list.push(action.payload)
            cars.loading = false;
        },

        carRemoved: (cars, action) => {
            cars.list.filter(car => car._id !== action.payload._id);
        },

        carLotLocationAssigned: (cars, action) => {
            console.log(cars.list)
        },

        test: (cars, action) => {
            console.log(cars.list)
        }
    }
});

// Action Creators

const {
    carAdded,
    carsRequested,
    carsReceived,
    carsRequestFailed,
    loading,
    // carLotLocationAssigned,
    test
} = slice.actions;

export default slice.reducer;

const url = '/cars';

export const loadCars = () => (dispatch, getState) => {
    // const { lastFetch } = getState().entities.cars;

    // const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    // if (diffInMinutes < 2) return;


    return dispatch(
        apiCallBegan({
            url,
            onStart: carsRequested.type,
            onSuccess: carsReceived.type,
            onError: carsRequestFailed.type
        }))

}

export const addCar = car =>
    apiCallBegan({
        url,
        method: 'post',
        data: car,
        onStart: loading.type,
        onSuccess: carAdded.type
    });

export const assignCarlotLocation = (_id, lotLocation) =>
    apiCallBegan({
        url: `${url}/${_id}`,
        method: 'patch',
        data: lotLocation,
        onSuccess: test.type
    })

// Selectors

export const getCarByPhoneMakeModel = obj => createSelector(
    state => state.entities.cars,
    cars => cars.list.filter(car => {
        const matchCar = {
            phone: car.phone,
            make: car.make,
            model: car.model
        };

        const savedCar = {
            phone: obj.phone,
            make: obj.make,
            model: obj.model
        }


        return _.isEqual(matchCar, savedCar);
    })
)

export const getCarById = id => createSelector(
    state => state.entities.cars,
    cars => cars.list.filter(car => car._id === id)
)