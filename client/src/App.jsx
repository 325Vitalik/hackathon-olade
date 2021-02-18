import React from "react";
import { Provider } from "react-redux";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import ExampleComponent from "./ExampleComponent/ExampleComponent";
import store from "./root/store";
import { Router } from "@reach/router";

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<SignIn path="sign-in" />
					<SignUp path="sign-up" />
					<ExampleComponent path="/" />
				</Router>
			</Provider>
		);
	}
}
