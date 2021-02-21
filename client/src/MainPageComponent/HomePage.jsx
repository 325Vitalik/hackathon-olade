import React, { Component } from "react";
import Header from "../Shared/Header";
import { PostList } from "../Shared/PostListComponent";
import { Container } from "semantic-ui-react";
import styles from "./main-page.module.sass";
import { SearchAnimalForm } from "./SerchAnimalForm";
import { loadPetsWithQuery } from "./petActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HomePage extends Component {
	componentDidMount = () => {
		this.updateLocation();
	};

	componentDidUpdate = (prevProps) => {
		if (prevProps.type !== this.props.type) {
			this.updateLocation();
		}
	};

	updateLocation = () => {
		const pathname = window.location.pathname;

		if (pathname === "/search") {
			this.props.loadPetsWithQuery({ type: "search" });
		} else {
			this.props.loadPetsWithQuery({ type: "found" });
		}
	};

	render() {
		return (
			<>
				<Header />
				<Container className={styles.mainContainer}>
					<SearchAnimalForm />
					<PostList list={this.props.pets || []} />
				</Container>
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			loadPetsWithQuery,
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		pets: state.pets.pets,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
