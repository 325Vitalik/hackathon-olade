import { combineReducers } from "redux";
import auth from "../Auth/authReducer";
import main from "../MainPage/mainPageReducer";

const rootReducer = combineReducers({
	auth,
	main,
});

export default rootReducer;
