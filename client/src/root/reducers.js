import {combineReducers} from "redux";
import auth from '../Auth/authReducer';

const rootReducer=combineReducers({
    auth,
})

export default rootReducer;