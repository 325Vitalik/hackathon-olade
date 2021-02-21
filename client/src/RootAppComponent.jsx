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
import HomePage from "./MainPageComponent/HomePage";
import SubmitForm from "./SumbitForm";
import { auth, getCurrentUser } from "./Auth/firebaseService";
import Loader from "react-loader-spinner";

class RootAppComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			load: true,
		};
	}
	componentDidMount = () => {
		auth.onAuthStateChanged((user) => {
			this.setState({
				load: false,
			});
			this.props.initialInsertCurrentUser();
		});
	};

	render() {
		const isLoggedIn = getCurrentUser();

		return (
			<>
				{this.state.load ? (
					<div className={'submit-form-loader-wrapper'}>
						<Loader type="Puff" color="#2b2b2bd9" height={'100vh'} width={100} />
					</div>
				) : (
					<Router>
						{isLoggedIn ? (
							<>
								<Profile path="profile" />
								<PetPage path="pet-profile/:id" />
								<HomePage path="/search" type="search" />
								<HomePage path="/found" type="found" />
								<SubmitForm path="/submit-form" searchType={this.props.searchType} />
							</>
						) : null}
						<SignIn path="sign-in" />
						<SignUp path="sign-up" />
						<MainPage default path="/" />
					</Router>
				)}
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ initialInsertCurrentUser }, dispatch);
}

function mapStateToProps(state) {
	return {
		currentUser: state.auth.currentUser,
		searchType: state.main.searchType,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RootAppComponent);
