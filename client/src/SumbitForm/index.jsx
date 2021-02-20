import { useReducer } from "react";
import './styles.css';
import { Button, Checkbox, Container, Dropdown, Form, Header, Image, TextArea } from "semantic-ui-react";
import { animalTypes, photo } from "./mocks";
import SelectColour from "./SelecColour";
import SelectRadius from "./SelectRadius";
import SelectBreed from "./SelecBreed";
import {
    DateInput,
  } from 'semantic-ui-calendar-react';
  import {
    getLatLng, geocodeByPlaceId
  } from 'react-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import debounce from 'debounce';
import { config } from "../config";
import ImageUploader from "./ImageUploader";


const submitFormActions={
    setAnimalType:'SET_ANIMAL_TYPE',
    setAnimalName:'SET_ANIMAL_NAME',
    setAnimalBreed:'SET_ANIMAL_BREED',
    setAnimalColour:'SET_ANIMAL_COLOUR',
    setAnimalLossDate:'SET_ANIMAL_LOSS_DATE',
    setAnimalLossLocation:'SET_ANIMAL_LOSS_LOCATION',
    setAnimalLossLocationCoordinates:'SET_ANIMAL_LOSS_LOCATION_COORDINATES',
    setAllowedRadius:'SET_ALLOWED_RADIUS',
    setAnimalDescription:'SET_ANIMAL_DESCRIPTION',
    setAward:'SET_AWARD'
}

function init() {
    return {
        award:0,
        animalType:'',
        animalName:'',
        animalBreed:'',
        animalColour:'',
        shouldNameNotBeValidated:false,
        lossDate:'',
        lossLocation:null,
        lossLocationCoordinates:null,
        allowedRadius:1000,
        animalDescription:'',
        isImageLoading:false,
    };
}
  
  function reducer(state, action) {
    switch (action.type) {
      case submitFormActions.setAnimalType:
        return {...state, animalType:action.payload};
      case submitFormActions.setAnimalName:
        return {...state, animalName:action.payload};
      case submitFormActions.setAnimalLossDate:
        return {...state, lossDate:action.payload};
      case submitFormActions.setAnimalLossLocation:
          return {...state, lossLocation: action.payload};
      case submitFormActions.setAnimalLossLocationCoordinates:
          return {...state, lossLocationCoordinates:action.payload}
      case submitFormActions.setAllowedRadius:
          return {...state, allowedRadius:action.payload}
      case submitFormActions.setAnimalDescription:
          return {...state, animalDescription:action.payload}
      case submitFormActions.setAward:
           return {...state, award:action.payload}
      case submitFormActions.setAnimalColour:
          return {...state, colour:action.payload}
      default:
        return state
    }
  }

const SubmitForm=()=>{
    const [state, dispatch] = useReducer(reducer, {}, init);
    const onDescriptionChange=debounce((e, {value})=>{
        dispatch({type:submitFormActions.setAnimalDescription, payload:value})
    }, 2000)
    return (
        <Container>
            <div className={'submit-form-header'}>
                <h2>Register Pet</h2>
            </div>
            <Form>
                <Header>Please input info</Header>
                <div className={'submit-form-pets-main-info-wrapper'}>
                    <ImageUploader />
                    <div className={'submit-form-pets-main-info'}>
                        <Form.Field
                        >
                            <label>Pets Name</label>
                            <Form.Input placeholder={'Pets Name'} onChange={(e, {value})=>{
                        dispatch({type:submitFormActions.setAnimalName, payload:value})
                    }}/>
                            <Checkbox label={'I don\'t know name'}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Animal type</label>
                            <Dropdown placeholder={'Select animal type'} selection options={animalTypes} onChange={(event, object)=>{
                                dispatch({type:submitFormActions.setAnimalType, payload:object.value})
                            }}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Breed</label>
                            <SelectBreed animalType={state.animalType} onChange={(event, object)=>{
                                    dispatch({type:submitFormActions.setAnimalBreed, payload:object.value})
                                }}/>
                        </Form.Field>
                    </div>
                </div>
            </Form>
            <Header>Additional info</Header>
            <Form>
                <div className={'submit-form-additional-info-wrapper'}>
                <Form.Group widths={'equal'}>
                <Form.Field>
                    <label>Colour</label>
                    <SelectColour onChange={(e, {value})=>{
                        dispatch({type:submitFormActions.setAnimalColour, payload:value})
                    }} />
                </Form.Field>
                <Form.Field>
                    <label>Award</label>
                    <Form.Input placeholder={'Award'} icon={'money bill alternate outline'} iconPosition={'left'} onChange={(e, {value})=>{
                        dispatch({type:submitFormActions.setAward, payload:value})
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>Day of loss</label>
                    <DateInput name={'Day of loss'} closable={true} placeholder={'select day of loss'} value={state.lossDate} onChange={(e,{value})=>{
                        dispatch({type:submitFormActions.setAnimalLossDate, payload:value})
                    }}/>
                </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description' onChange={onDescriptionChange}/>
                </Form.Field>
                <Form.Group widths={'equal'}>
                <Form.Field>
                    <label>Coordinates</label>
                    <GooglePlacesAutocomplete debounce={2000} selectProps={{value:state.lossLocation, onChange:(addressData)=>{
                        geocodeByPlaceId(addressData.value.place_id).then(result=>getLatLng(result[0])).then(coordinates=>dispatch({type:submitFormActions.setAnimalLossLocationCoordinates, payload:coordinates}))
                        dispatch({type:submitFormActions.setAnimalLossLocation, payload:addressData})
                    }}} apiKey={config["api-key"]} />
                </Form.Field>
                <Form.Field>
                    <label>Radius</label>
                    <SelectRadius value={state.allowedRadius} onChange={(e, {value})=>{
                        dispatch({type:submitFormActions.setAllowedRadius, payload:value})
                    }}/>
                </Form.Field>
                </Form.Group>
                </div>
                <Form.Group widths={"equal"}>
                    <Form.Button fluid onClick={()=>{console.log(state)}}>Cancel</Form.Button>
                    <Form.Button fluid onClick={()=>{console.log(state)}}>Submit</Form.Button>
                </Form.Group>
            </Form>
        </Container>
      );
}

export default SubmitForm;