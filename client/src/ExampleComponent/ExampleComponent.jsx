import React, { PureComponent } from "react";
import { Button, Form, Item, Segment, Header } from "semantic-ui-react";
import { searchAction } from "./exampleActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuthHeader } from "../Auth/firebaseService";
import socket from "../socket";
import { signOut } from '../Auth/authActions';
import { config } from '../config';

class ExampleComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",
		};
	}

	componentDidMount() {
		socket.on("message", ({ message }) =>
			this.setState({
				message,
			})
		);
	}

	onSearchChange = (e, { value }) => {
		this.setState({
			searchValue: value,
		});
	};

	onCheckAuth = () => {
		const url = new URL(`${config.hostname}/unauth/need`);
		fetch(url, {
			headers: {
				Authorization: getAuthHeader(),
			},
		});
	};

	onCheckAuthSimple = () => {
		const url = new URL(`${config.hostname}/unauth/need`);
		fetch(url);
	};

	render() {
		return (
			<Segment>
				<Header as="h1">{this.props.userDisaplyName}</Header>
				<Form>
					<Form.Input value={this.state.searchValue} onChange={this.onSearchChange} label="search" />
					<Button onClick={() => socket.emit("button-clicked", { message: "clicked" })} type="submit">
						Submit
					</Button>
				</Form>
				<Button onClick={this.onCheckAuth}>Check auth with token</Button>
				<Button onClick={this.onCheckAuthSimple}>Check auth without token</Button>
				<Button onClick={this.props.signOut}>Sign out</Button>
				<Item>
					<Item.Content>
						<Item.Header>{this.props.foundData}</Item.Header>
					</Item.Content>
				</Item>
			</Segment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			signOut,
			searchAction,
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		foundData: state.exampleReducer.foundData,
		userDisaplyName: state.auth.currentUser?.displayName,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);
