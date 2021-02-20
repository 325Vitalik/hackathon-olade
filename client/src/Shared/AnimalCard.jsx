import React, { useState, useEffect } from 'react';
import styles from './shared.module.sass'
import {
	Card, Icon,
	Image,
} from 'semantic-ui-react';
import {navigate} from '@reach/router';

export const AnimalCard = props => {
	const id = 0;
	return (
		<Card className={styles.animalCard}>
			<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
			<Card.Content>
				<Card.Header onClick={() => navigate(`/pet-profile/${id}`)}>Моя Псина</Card.Header>
				<Card.Meta>
					<span className='date'>додано 15 лютого 2021</span>
				</Card.Meta>
				<Card.Description>
					Не дай боже тобы мати таку псину. НЕ ДАЙ БОЖЕ!!!!!!
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>
					<Icon name='paw' />
					Пес
				</a>
			</Card.Content>
		</Card>
	)
}
