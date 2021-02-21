import React, { useState, useEffect } from 'react';
import styles from './shared.module.sass';
import {AnimalCard} from './AnimalCard';

export const PostList = ({list}) => {

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