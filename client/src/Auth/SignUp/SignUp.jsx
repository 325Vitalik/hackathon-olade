import React, { PureComponent } from "react";
import { Button, Form, Input, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../authActions";

class SignUpComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
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
		this.props.registerUser(this.state);
	};

	render() {
		return (
			<Segment>
				<Form>
					<Form.Group inline>
						<Form.Field
							control={Input}
							label="Ім'я"
							value={this.state.firstName}
							onChange={this.handleInputChange("firstName")}
						/>
						<Form.Field
							control={Input}
							label="Прізвище"
							value={this.state.lastName}
							onChange={this.handleInputChange("lastName")}
						/>
					</Form.Group>
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
					<Button type="submit" onClick={this.onSubmit}>
						Зареєструватись
					</Button>
				</Form>
			</Segment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			registerUser,
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(SignUpComponent);
