import React from "react";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import styles from "./shared.module.sass";
import logo from "../assets/images/logo.png";
import { navigate, useLocation } from "@reach/router";
import { connect, useDispatch } from "react-redux";
import { signOut } from "../Auth/authActions";
import { bindActionCreators } from "redux";

const Header = ({ signOut, currentUser, searchType }) => {
	const location = useLocation();
	console.log(location.pathname !== "/found" && searchType === 'search');
	const isSearch = location.pathname === "/search" || (location.pathname !== "/found" && searchType === 'search');
	const isFound = location.pathname === "/found" || (!isSearch && searchType === 'found');

	return (
		<Menu borderless fixed="top" className={styles.menuStyle}>
			<Container className={styles.headerContainer}>
				<Menu.Item
					onClick={() => navigate("/search")}
					className={`${styles.headerItem} ${styles.first}`}
					header
				>
					<Image className={styles.mainLogo} src={logo} />
				</Menu.Item>
				<Menu.Item
					onClick={() => navigate("/search")}
					className={`${styles.headerItem} ${isSearch ? styles.active : null}`}
					as="a"
				>
					Шукаю
				</Menu.Item>
				<Menu.Item
					onClick={() => navigate("/found")}
					className={`${styles.headerItem} ${isFound ? styles.active : null}`}
					as="a"
				>
					Знайшов
				</Menu.Item>
				<Menu.Menu position="right">
					<Dropdown text={currentUser?.firstName || ""} pointing className="link item">
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => navigate("/profile")}>Профіль</Dropdown.Item>
							<Dropdown.Item onClick={signOut} className={styles.headerListItem}>
								Вийти
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Container>
		</Menu>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			signOut,
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		currentUser: state.auth.currentUser,
		searchType: state.main.searchType
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
