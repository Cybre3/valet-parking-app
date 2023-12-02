import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import carsSlice from "./cars";


// Reducer 

const slice = createSlice({
    name: 'messages',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {
        messageSending: (messages, action) => {
            messages.loading = true;
        },

        messageFailed: (messages, action) => {
            messages.loading = false;
        },

        messageSent: (messages, action) => {
            const { phone, carId } = action.payload;
            messages.list.push({ phone, carId });
        },

        carInTransitMessageSent: (messages, action) => {
            messages.list.filter(msg => msg.carId !== action.payload.carId);
            
            messages.loading = false;
        }
    }
});

// Action Creators

const {
    messageSending,
    messageSent,
    messageFailed,
    carInTransitMessageSent
} = slice.actions;

export default slice.reducer;

const url = '/sms';

export const sendMessage = smsObj =>
    apiCallBegan({
        url,
        method: 'post',
        data: smsObj,
        onStart: messageSending.type,
        onSuccess: messageSent.type,
        onError: messageFailed.type
    })

export const sendCarInTransitSMS = smsObj =>
    apiCallBegan({
        url: `${url}/carInTransit`,
        method: 'post',
        data: smsObj,
        onStart: messageSending.type,
        onSuccess: carInTransitMessageSent.type,
        onError: messageFailed.type
    })


// Selectors