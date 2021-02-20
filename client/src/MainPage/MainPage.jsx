import React, { PureComponent } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./MainPage.sass";
import { navigate } from "@reach/router";

class MainPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
		};
	}

	componentDidMount() {}

	render() {
		return (
			<Grid className="container-wrapper main-page" columns={2} padded divided>
				<Grid.Row className="container-column">
					<Grid.Column className="container-column">
						<div onClick={() => navigate("/sign-in")} className="background-container lost-container">
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
						<div onClick={() => navigate("/sign-in")} className="background-container find-container">
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
	return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
