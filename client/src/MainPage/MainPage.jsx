import React, { PureComponent } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./MainPage.sass";
import { navigate } from "@reach/router";
import { setRouteToRedirect } from "./mainPageActions";

class MainPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
		};
	}

	componentDidMount() {
		const pathname = window.location.pathname;

		if (pathname !== "/") {
			navigate("/");
		}
	}

	navigateToPrivatePage = (route) => () => {
		const isLoggedIn = Boolean(this.props.currentUser);

		if (isLoggedIn) {
			navigate(route);
		} else {
			this.props.setRouteToRedirect(route);
			navigate("/sign-in");
		}
	};

	render() {
		const isLoggedIn = Boolean(this.props.currentUser);

		return (
			<Grid className="container-wrapper main-page" columns={2} padded divided>
				<Grid.Row className="container-column">
					<Grid.Column className="container-column">
						<div
							onClick={this.navigateToPrivatePage("/found")}
							className="background-container lost-container"
						>
							<div className="overlay">
								<div className="flex-align-center text-box">
									<h1 className="header">Знайти друга</h1>
									<p className="content">
										Зроби оголошення про зникнення свого домашнього улюбленця. Можливо його уже
										знайшли, тож глянь у списку знайдених)
									</p>
								</div>
							</div>
						</div>
					</Grid.Column>
					<Grid.Column className="container-column">
						<div
							onClick={this.navigateToPrivatePage("/search")}
							className="background-container find-container"
						>
							<div className="overlay">
								<div className="flex-align-center text-box">
									<h1 className="header">Знайшов друга</h1>
									<p className="content">
										Якщо ви знайшли чийогось загубленого домашнього улюбленця ви можете залишити
										оголошення про його знахідку. Ви можете знайти власника та ощасливити його
									</p>
								</div>
							</div>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setRouteToRedirect,
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		currentUser: state.auth.currentUser,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
