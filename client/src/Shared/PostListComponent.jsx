import React, { useState, useEffect } from 'react';
import styles from './shared.module.sass';
import {AnimalCard} from './AnimalCard';

export const PostList = () => {
	const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div className={styles.mainListWrapper}>
			{
				list.map((item, i) => (
					<AnimalCard key={i}/>
				))
			}
		</div>
	)
}