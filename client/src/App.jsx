import React from "react";
import { Provider } from "react-redux";
import store from "./root/store";
import RootAppComponent from "./RootAppComponent";
import 'react-toastify/dist/ReactToastify.css';
export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RootAppComponent />
			</Provider>
		);
	}
}
