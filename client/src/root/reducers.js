import { combineReducers } from "redux";
import exampleReducer from "../ExampleComponent/exampleReducer";
import auth from "../Auth/authReducer";
import main from "../MainPage/mainPageReducer";

const rootReducer = combineReducers({
	exampleReducer,
	auth,
	main,
});

export default rootReducer;
