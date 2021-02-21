import React, { useState, useEffect } from 'react';
import styles from './shared.module.sass';
import {AnimalCard} from './AnimalCard';

export const PostList = ({list}) => {

	console.log(list)
	return (
		<div className={styles.mainListWrapper}>
			{
				list.map((item, i) => (
					<AnimalCard cardData={item} key={i}/>
				))
			}
		</div>
	)
}