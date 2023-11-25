import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";


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

        messageSent: (messages, action) => {
            const { phone, carId } = action.payload;
            messages.list.push({ phone, carId });
        }
    }
});

// Action Creators

const {
    messageSending,
    messageSent
} = slice.actions;

export default slice.reducer;

const url = '/sms';

export const sendMessage = smsObj =>
    apiCallBegan({
        url,
        method: 'post',
        data: smsObj,
        onStart: messageSending.type,
        onSuccess: messageSent.type
    })

// Selectors