import React, { PureComponent } from "react";
import { Button, Form, Grid, Header, Segment, Image, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signInUsingGoogle, signInUsingEmailAndPassword } from "../authActions";
import { Link, navigate } from "@reach/router";
import "./SignIn.sass";

class SignInComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleInputChange = (propertyName) => (e) => {
		this.setState({
			[propertyName]: e.target.value,
		});
	};

	onSubmit = () => {
		this.props.signInUsingEmailAndPassword(this.state);
	};

	render() {
		return (
			<Grid textAlign="center" className="sign-in-box" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Form size="large">
						<Segment>
							<Form.Input
								value={this.state.email}
								onChange={this.handleInputChange("email")}
								fluid
								icon="user"
								iconPosition="left"
								placeholder="E-mail"
							/>
							<Form.Input
								value={this.state.password}
								onChange={this.handleInputChange("password")}
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Пароль"
								type="password"
							/>
							<Button
								onClick={this.props.signInUsingGoogle}
								className="btn"
								color="google plus"
								fluid
								size="large"
							>
								Увійти з Google
							</Button>
							<Button onClick={this.onSubmit} className="btn" color="primary" fluid size="large">
								Увійти
							</Button>
						</Segment>
					</Form>
					<Message>
						Ще не маєте акунту?{" "}
						<Link to={"/sign-up"} onClick={() => navigate("/sign-up")}>
							Зареєструватись
						</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			signInUsingGoogle,
			signInUsingEmailAndPassword,
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(SignInComponent);
