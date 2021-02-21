import { combineReducers } from "redux";
import auth from "../Auth/authReducer";
import main from "../MainPage/mainPageReducer";
import pets from "../MainPageComponent/petReducer";

const rootReducer = combineReducers({
	auth,
	main,
	pets,
});

export default rootReducer;
