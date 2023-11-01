import { combineReducers } from "redux";

import carsReduceer from './cars';

export default combineReducers({
    cars: carsReduceer
})