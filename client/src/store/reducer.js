import { combineReducers } from "redux";

import entitiesReducer from "./entitiesReducer";

export default combineReducers({
    entites: entitiesReducer
})