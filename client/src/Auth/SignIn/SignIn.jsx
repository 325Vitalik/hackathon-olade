import React, { PureComponent } from "react";
import { Button, Form, Input, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signInUsingGoogle, signInUsingEmailAndPassword } from "../authActions";

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
			<Segment>
				<Form>
					<Form.Field>
						<label>Email</label>
						<input value={this.state.email} onChange={this.handleInputChange("email")} />
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							value={this.state.password}
							onChange={this.handleInputChange("password")}
						/>
					</Form.Field>
					<Button onClick={this.props.signInUsingGoogle}>Google</Button>
					<Button type="submit" onClick={this.onSubmit}>
						Увійти
					</Button>
				</Form>
			</Segment>
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
