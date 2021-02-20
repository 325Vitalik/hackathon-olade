import React from "react";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import ExampleComponent from "./ExampleComponent/ExampleComponent";
import { initialInsertCurrentUser } from "./Auth/authActions";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MainPage from "./MainPage/MainPage";

class RootAppComponent extends React.Component {
	componentDidMount = () => {
		this.props.initialInsertCurrentUser();
	};

	render() {
		return (
			<Router>
				<SignIn path="sign-in" />
				<SignUp path="sign-up" />
				<MainPage path="/" />
			</Router>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ initialInsertCurrentUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RootAppComponent);
