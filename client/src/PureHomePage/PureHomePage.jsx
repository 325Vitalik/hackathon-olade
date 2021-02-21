import React, { Component } from "react";
import Header from "../Shared/Header";
import { PostList } from "../Shared/PostListComponent";
import { Container } from "semantic-ui-react";
import styles from "../MainPageComponent/main-page.module.sass";
import { connect } from "react-redux";

class PureHomePage extends Component {
	render() {
		return (
			<>
				<Header />
				<Container className={styles.mainContainer}>
					<PostList list={this.props.pets || []} />
				</Container>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		pets: state.pets.pets,
	};
}

export default connect(mapStateToProps, null)(PureHomePage);
