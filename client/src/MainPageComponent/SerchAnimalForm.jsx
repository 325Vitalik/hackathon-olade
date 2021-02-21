import React, { useState } from 'react';
import styles from './main-page.module.sass'
import {Button, Form} from 'semantic-ui-react';
import { navigate, useLocation } from '@reach/router';
import { useDispatch } from 'react-redux';
import {setSearchVariant} from './../MainPage/mainPageActions'

export const SearchAnimalForm = () => {
	const [animalKind, setAnimalKind] = useState('dog');
	const dispatch=useDispatch();
	const location=useLocation();

	return (
		<div className={styles.searchFormWrapper}>
			<Form className={styles.searchForm}>
				<Form.Field>
				<Button fluid onClick={()=>{
					if(location.pathname === '/search'){
						dispatch(setSearchVariant('search'));
					}else{
						dispatch(setSearchVariant('found'))
					}
					navigate('/submit-form');
				}}>Подати оголошення</Button>
				</Form.Field>
				<Form.Group inline>
					<label>Вид:</label>
					<Form.Radio
						label='Песик'
						value='dog'
						checked={animalKind === 'dog'}
						onChange={() => setAnimalKind('dog')}
					/>
					<Form.Radio
						label='Котик'
						value='kat'
						checked={animalKind === 'cat'}
						onChange={() => setAnimalKind('cat')}
					/>
				</Form.Group>
				<Form.Field>
					<label>Кличка</label>
					<input placeholder='Мурзик' />
				</Form.Field>
				<Button>Submit</Button>
			</Form>
		</div>
	)
}