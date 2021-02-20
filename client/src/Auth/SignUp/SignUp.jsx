import React, { PureComponent } from "react";
import { Button, Form, Input, Segment, Grid, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../authActions";
import "./SignUp.sass";

class SignUpComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			firstName: {
				value: "",
				error: null,
				validate: this.validateFirstName,
			},
			lastName: {
				value: "",
				error: null,
				validate: () => null,
			},
			phone: {
				value: "",
				error: null,
				validate: () => null,
			},
			email: {
				value: "",
				error: null,
				validate: this.validateEmail,
			},
			password: {
				value: "",
				error: null,
				validate: this.validatePassword,
			},
			confirmPassword: {
				value: "",
				error: null,
				validate: this.validateConfirmPassword,
			},
		};
	}

	handleInputChange = (propertyName) => (e) => {
		const error = this.validate(propertyName);

		this.setState({
			[propertyName]: {
				...this.state[propertyName],
				value: e.target.value,
				error,
			},
		});
	};

	validate = (propertyName) => {
		return this.state[propertyName]?.validate();
	};

	setError = (propertyName, error) => {
		this.setState({
			[propertyName]: {
				...this.state[propertyName],
				error,
			},
		});
	};

	onSubmit = () => {
		const allProps = ["firstName", "lastName", "phone", "email", "password", "confirmPassword"];

		allProps.forEach((prop) => this.validate(prop));

		const isFormValid = allProps.every((prop) => !this.state[prop]?.error);

		if (isFormValid) {
			const user = {
				firstName: this.state.firstName.value,
				lastName: this.state.lastName.value,
				phone: this.state.phone.value,
				email: this.state.email.value,
				password: this.state.password.value,
			};

			this.props.registerUser(user);
		}
	};

	validateFirstName = () => {
		const valid = Boolean(this.state.firstName.value);
		const error = valid ? null : { content: "Обов'язкове поле" };
		this.setError("firstName", error);
		return error;
	};

	validateEmail = () => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const valid = re.test(this.state.email.value.toLowerCase());
		const error = valid ? null : { content: "E-mail не валідний" };
		this.setError("email", error);
		return error;
	};

	validatePassword = () => {
		const re = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
		const valid = re.test(this.state.password.value);
		const error = valid ? null : { content: "Пароль має бути мінімум 8 символів і містити символи і цифри" };
		this.setError("password", error);
		return error;
	};

	validateConfirmPassword = () => {
		const valid = this.state.password.value === this.state.confirmPassword.value;
		const error = valid ? null : { content: "Паролі не співпадають" };
		this.setError("confirmPassword", error);
		return error;
	};

	render() {
		return (
			<Grid textAlign="center" className="sign-up-box" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Form size="large">
						<Segment>
							<Form.Field
								control={Input}
								placeholder="Ім'я *"
								value={this.state.firstName.value}
								onChange={this.handleInputChange("firstName")}
								error={this.state.firstName.error}
							/>
							<Form.Field
								control={Input}
								placeholder="Прізвище"
								value={this.state.lastName.value}
								onChange={this.handleInputChange("lastName")}
							/>
							<Form.Field
								control={Input}
								placeholder="Номер телефону"
								value={this.state.phone.value}
								onChange={this.handleInputChange("phone")}
							/>
							<Form.Field
								control={Input}
								placeholder="E-mail *"
								value={this.state.email.value}
								onChange={this.handleInputChange("email")}
								error={this.state.email.error}
							/>
							<Form.Field
								control={Input}
								placeholder="Пароль *"
								value={this.state.password.value}
								onChange={this.handleInputChange("password")}
								error={this.state.password.error}
								type="password"
							/>
							<Form.Field
								control={Input}
								placeholder="Підтвердити пароль *"
								value={this.state.confirmPassword.value}
								onChange={this.handleInputChange("confirmPassword")}
								error={this.state.confirmPassword.error}
								type="password"
							/>
							<Button onClick={this.onSubmit} className="btn" color="primary" fluid size="large">
								Зареєструватись
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
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
