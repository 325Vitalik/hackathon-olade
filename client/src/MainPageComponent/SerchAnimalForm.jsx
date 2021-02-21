import React, { useReducer, useState } from 'react';
import styles from './main-page.module.sass'
import {Button, Form} from 'semantic-ui-react';
import { navigate, useLocation } from '@reach/router';
import { useDispatch } from 'react-redux';
import {setSearchVariant} from './../MainPage/mainPageActions'
import SelectBreed from '../SumbitForm/SelecBreed';
import SelectColour from '../SumbitForm/SelecColour';
import SelectRadius from '../SumbitForm/SelectRadius';
import SelectAddress from '../SumbitForm/SelectAddress';

const filterActions = {
	setAnimalType: "FILTER_ANIMAL_TYPE",
	setAnimalName: "FILTER_ANIMAL_NAME",
	setAnimalBreed: "FILTER_ANIMAL_BREED",
	setAnimalColour: "FILTER_ANIMAL_COLOUR",
	setAnimalLossLocation: "FILTER_ANIMAL_LOSS_LOCATION",
	setAnimalLossLocationCoordinates: "FILTER_ANIMAL_LOSS_LOCATION_COORDINATES",
	setAllowedRadius: "FILTER_ALLOWED_RADIUS",
  };
  
  function init() {
	return {
	  animalType: "dog",
	  animalName: "",
	  animalBreed: "",
	  animalColour: "",
	  lossLocation: null,
	  lossLocationCoordinates: null,
	  allowedRadius: 1000,
	};
  }
  
  function reducer(state, action) {
	switch (action.type) {
	  case filterActions.setAnimalType:
		return { ...state, animalType: action.payload };
	  case filterActions.setAnimalName:
		return { ...state, animalName: action.payload };
	  case filterActions.setAnimalBreed:
		return {...state, animalBreed:action.payload}
	  case filterActions.setAnimalColour:
		return { ...state, animalColour: action.payload };
	  case filterActions.setAnimalLossLocation:
		return { ...state, lossLocation: action.payload };
	  case filterActions.setAnimalLossLocationCoordinates:
		return { ...state, lossLocationCoordinates: action.payload };
	  case filterActions.setAllowedRadius:
		return { ...state, allowedRadius: action.payload };
	  default:
		return state;
	}
  }
  

export const SearchAnimalForm = () => {
	const [componentState, componentDispatch]=useReducer(reducer, {}, init)
	const dispatch=useDispatch();
	const location=useLocation();
	const createChangeAction=(type)=>{
		return ((e, { value }) => {
			componentDispatch({
			  type,
			  payload: value,
			});
		  })
	}

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
						checked={componentState.animalType === 'dog'}
						onChange={() => componentDispatch({type:filterActions.setAnimalType, payload:'dog'})}
					/>
					<Form.Radio
						label='Котик'
						value='kat'
						checked={componentState.animalType === 'cat'}
						onChange={() => componentDispatch({type:filterActions.setAnimalType, payload:'cat'})}
					/>
				</Form.Group>
				<Form.Field>
					<label>Кличка</label>
					<input placeholder='Мурзик' value={componentState.animalName} onChange={(e) => {
						const value=e.target.value;
                      componentDispatch({
                        type: filterActions.setAnimalName,
                        payload: value,
                      });
                    }}/>
				</Form.Field>
				<Form.Field>
				<SelectBreed onChange={createChangeAction(filterActions.setAnimalBreed)} animalType={componentState.animalType}/>
				</Form.Field>
				<Form.Field>
					<SelectColour onChange={createChangeAction(filterActions.setAnimalColour)} />
				</Form.Field>
				<Form.Field>
				<SelectAddress
                    lossLocation={componentState.lossLocation}
                    onChangeCoordinates={(coordinates) =>
						componentDispatch({
                        type:
                          filterActions.setAnimalLossLocationCoordinates,
                        payload: coordinates,
                      })
                    }
                    onChangeLocation={(addressData) =>
						componentDispatch({
                        type: filterActions.setAnimalLossLocation,
                        payload: addressData,
                      })
                    }
                  />
				</Form.Field>
				<Form.Field disabled={!componentState.lossLocation}>
					<SelectRadius onChange={createChangeAction(filterActions.setAllowedRadius)} />
				</Form.Field>
				<Button onClick={()=>{
					console.log(componentState);
				}}>Submit</Button>
			</Form>
		</div>
	)
}