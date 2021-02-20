import React from 'react';
import {Container, Dropdown, Image, Menu} from 'semantic-ui-react';
import styles from './shared.module.sass';
import logo from '../assets/images/logo.png';
import { navigate, useLocation } from '@reach/router';

export const Header = () => {
	const location = useLocation();
	const isSearch = location.pathname === '/search';
	const isFound = location.pathname === '/found';
	return (
		<Menu
			borderless
			fixed='top'
			className={styles.menuStyle}
		>
			<Container className={styles.headerContainer}>
				<Menu.Item onClick={() => navigate('/search')} className={`${styles.headerItem} ${styles.first}`} header>
					<Image className={styles.mainLogo} src={logo}/>
				</Menu.Item>
				<Menu.Item onClick={() => navigate('/search')} className={`${styles.headerItem} ${isSearch ? styles.active : null}`} as='a'>
					Шукаю
				</Menu.Item>
				<Menu.Item onClick={() => navigate('/found')} className={`${styles.headerItem} ${isFound ? styles.active : null}`} as='a'>
					Знайшов
				</Menu.Item>
				<Menu.Menu position='right'>
					<Dropdown text='UserName' pointing className='link item'>
						<Dropdown.Menu>
							<Dropdown.Item>Профіль</Dropdown.Item>
							<Dropdown.Item className={styles.headerListItem}>
								Вийти
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Container>
		</Menu>
	);
}