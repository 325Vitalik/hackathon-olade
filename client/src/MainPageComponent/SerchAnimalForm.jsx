import React, { useState } from 'react';
import styles from './main-page.module.sass'
import {Button, Form} from 'semantic-ui-react';
import { navigate } from '@reach/router';

export const SearchAnimalForm = () => {
	const [animalKind, setAnimalKind] = useState('dog');
	return (
		<div className={styles.searchFormWrapper}>
			<Form className={styles.searchForm}>
				<Form.Field>
				<Button fluid onClick={()=>navigate('/submit-form')}>Create</Button>
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