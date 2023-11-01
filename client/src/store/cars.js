import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'cars',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
    },
    reducers: {
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
            const internalCars = cars.list;
            const addedCar = action.payload
            cars.list.push(action.payload)
            console.log('Car Added', {internalCars, addedCar})
        },

        carRemoved: (cars, action) => {
            cars.list.filter(car => car.id !== action.payload.id);
        }
    }
});

const {
    carsRequested,
    carsRequestFailed,
    carsReceived,
    carAdded,
    carRemoved
} = slice.actions;

export default slice.reducer;

const url = '/cars';

export const addCar = car => {
    console.log('attempting to call api to add acr')
    // apiCallBegan({
    //     url,
    //     method: 'post',
    //     data: car,
    //     onSuccess: carAdded.type
    // });
}