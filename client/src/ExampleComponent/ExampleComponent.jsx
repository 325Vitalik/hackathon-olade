import React, { PureComponent } from "react";
import { Button, Form, Item, Segment, Header } from "semantic-ui-react";
import { searchAction } from "./exampleActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuthHeader } from "../Auth/firebaseService";

class ExampleComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",
		};
	}

	onSearchChange = (e, { value }) => {
		this.setState({
			searchValue: value,
		});
	};

	onCheckAuth = () => {
		const url = new URL(`http://localhost:5000/unauth/need`);
		fetch(url, {
			headers: {
				Authorization: getAuthHeader(),
			},
		});
	};

	onCheckAuthSimple = () => {
		const url = new URL(`http://localhost:5000/unauth/need`);
		fetch(url);
	};

	render() {
		return (
			<Segment>
				<Header as="h1">{this.props.userDisaplyName}</Header>
				<Form>
					<Form.Input value={this.state.searchValue} onChange={this.onSearchChange} label="search" />
					<Button onClick={() => this.props.searchAction(this.state.searchValue)} type="submit">
						Submit
					</Button>
				</Form>
				<Button onClick={this.onCheckAuth}>Check auth with token</Button>
				<Button onClick={this.onCheckAuthSimple}>Check auth withot token</Button>
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
