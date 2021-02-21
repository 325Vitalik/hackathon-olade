import React from "react";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import Profile from "./Profile/index";
import PetPage from "./PetPage/index";
import { initialInsertCurrentUser } from "./Auth/authActions";
import { navigate, Router, useLocation } from "@reach/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MainPage from "./MainPage/MainPage";
import { HomePage } from "./MainPageComponent/HomePage";
import SubmitForm from "./SumbitForm";

class RootAppComponent extends React.Component {
	componentDidMount = () => {
		this.props.initialInsertCurrentUser();
	};

	render() {
		const isLoggedIn = Boolean(this.props.currentUser);

		return (
			<Router>
				{isLoggedIn ? (
					<>
						<Profile path="profile" />
						<PetPage path="pet-profile/:id" />
						<HomePage path="/search" />
						<HomePage path="/found" />
						<SubmitForm path="/submit-form" searchType={this.props.searchType}/>
					</>
				) : null}
				<SignIn path="sign-in" />
				<SignUp path="sign-up" />
				<MainPage default path="/" />
			</Router>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ initialInsertCurrentUser }, dispatch);
}

function mapStateToProps(state) {
	return {
		currentUser: state.auth.currentUser,
		searchType: state.main.searchType
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RootAppComponent);
