import {combineReducers} from "redux";
import exampleReducer from "../ExampleComponent/exampleReducer";
import auth from '../Auth/authReducer';

const rootReducer=combineReducers({
    exampleReducer,
    auth,
})

export default rootReducer;