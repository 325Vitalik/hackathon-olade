import React from "react";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import Profile from "./Profile/index"
import ExampleComponent from "./ExampleComponent/ExampleComponent";
import { initialInsertCurrentUser } from "./Auth/authActions";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class RootAppComponent extends React.Component {
	componentDidMount = () => {
		this.props.initialInsertCurrentUser();
	};

	render() {
		return (
			<Router>
				<SignIn path="sign-in" />
				<SignUp path="sign-up" />
				<Profile path="profile" />
				<ExampleComponent path="/" />
			</Router>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ initialInsertCurrentUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RootAppComponent);
