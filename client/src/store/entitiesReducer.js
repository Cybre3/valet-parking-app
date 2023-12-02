import { combineReducers } from "redux";

import carsReduceer from './cars';
import messagesReducer from './sms';

export default combineReducers({
    cars: carsReduceer,
    messages: messagesReducer
})