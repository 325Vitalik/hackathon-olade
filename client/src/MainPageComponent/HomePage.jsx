import React from 'react';
import Header from '../Shared/Header';
import {PostList} from '../Shared/PostListComponent';
import {Container} from 'semantic-ui-react';
import styles from './main-page.module.sass'
import {SearchAnimalForm} from './SerchAnimalForm';

export const HomePage = () => {
	return (
		<>
			<Header/>
			<Container className={styles.mainContainer}>
				<SearchAnimalForm/>
				<PostList list={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
			</Container>
		</>
	)
}