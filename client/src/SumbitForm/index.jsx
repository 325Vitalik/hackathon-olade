import { useReducer } from "react";
import "./styles.css";
import {
  Checkbox,
  Container,
  Dropdown,
  Form,
  Header,
  TextArea,
} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import { animalTypes } from "./mocks";
import SelectColour from "./SelecColour";
import SelectRadius from "./SelectRadius";
import SelectBreed from "./SelecBreed";
import { DateInput } from "semantic-ui-calendar-react";
import debounce from "debounce";
import { config } from "../config";
import ImageUploader from "./ImageUploader";
import AppHeader from "../Shared/Header";
import { navigate } from "@reach/router";
import { getAuthHeader } from "../Auth/firebaseService";
import { useSelector } from "react-redux";
import SelectAddress from "./SelectAddress";

const submitFormActions = {
  setAnimalType: "SET_ANIMAL_TYPE",
  setAnimalName: "SET_ANIMAL_NAME",
  setAnimalBreed: "SET_ANIMAL_BREED",
  setAnimalImage: "SET_ANIMAL_IMAGE",
  setAnimalColour: "SET_ANIMAL_COLOUR",
  setAnimalLossDate: "SET_ANIMAL_LOSS_DATE",
  setAnimalLossLocation: "SET_ANIMAL_LOSS_LOCATION",
  setAnimalLossLocationCoordinates: "SET_ANIMAL_LOSS_LOCATION_COORDINATES",
  setAllowedRadius: "SET_ALLOWED_RADIUS",
  setAnimalDescription: "SET_ANIMAL_DESCRIPTION",
  setAward: "SET_AWARD",
  setLoading: "SET_LOADING",
};

function init() {
  return {
    award: 0,
    animalType: "",
    animalName: "",
    animalBreed: "",
    animalColour: "",
    shouldNameNotBeValidated: false,
    lossDate: "",
    lossLocation: null,
    lossLocationCoordinates: null,
    allowedRadius: 1000,
    animalDescription: "",
    animalImageLink: null,
    isBeingSubmitted: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case submitFormActions.setAnimalType:
      return { ...state, animalType: action.payload };
    case submitFormActions.setAnimalName:
      return { ...state, animalName: action.payload };
    case submitFormActions.setAnimalLossDate:
      return { ...state, lossDate: action.payload };
    case submitFormActions.setAnimalLossLocation:
      return { ...state, lossLocation: action.payload };
    case submitFormActions.setAnimalLossLocationCoordinates:
      return { ...state, lossLocationCoordinates: action.payload };
    case submitFormActions.setAllowedRadius:
      return { ...state, allowedRadius: action.payload };
    case submitFormActions.setAnimalDescription:
      return { ...state, animalDescription: action.payload };
    case submitFormActions.setAward:
      return { ...state, award: action.payload };
    case submitFormActions.setAnimalColour:
      return { ...state, animalColour: action.payload };
    case submitFormActions.setAnimalImage:
      return { ...state, animalImageLink: action.payload };
    case submitFormActions.setLoading:
      return { ...state, isBeingSubmitted: action.payload };
    case submitFormActions.setAnimalBreed:
      return { ...state, animalBreed: action.payload };
    default:
      return state;
  }
}

const SubmitForm = () => {
  const [state, dispatch] = useReducer(reducer, {}, init);
  const { searchType } = useSelector((state) => state.main);

  const onDescriptionChange = debounce((e, { value }) => {
    dispatch({ type: submitFormActions.setAnimalDescription, payload: value });
  }, 2000);
  const onChangedLink = (value) => {
    dispatch({ type: submitFormActions.setAnimalImage, payload: value });
  };

  return (
    <>
      <AppHeader />
      {state.isBeingSubmitted ? (
        <div className={"submit-form-loader-wrapper"}>
          <Loader type="Puff" color="#2b2b2bd9" height={"100vh"} width={100} />
        </div>
      ) : (
        <Container className={"submit-form-container"}>
          <div className={"submit-form-header"}>
            <h2>Подати оголошення </h2>
          </div>
          <Form>
            <Header textAlign={"center"}>Заповніть основну інформацію</Header>
            <div className={"submit-form-pets-main-info-wrapper"}>
              <ImageUploader
                onChangedLink={onChangedLink}
                imageLink={state.animalImageLink}
              />
              <div className={"submit-form-pets-main-info"}>
                <Form.Field>
                  <label>Кличка</label>
                  <Form.Input
                    placeholder={"Кличка"}
                    onChange={(e, { value }) => {
                      dispatch({
                        type: submitFormActions.setAnimalName,
                        payload: value,
                      });
                    }}
                  />
                  {/* <Checkbox label={"I don't know name"} /> */}
                </Form.Field>
                <Form.Field>
                  <label>Вид тварини</label>
                  <Dropdown
                    placeholder={"Оберіть вид тварини"}
                    selection
                    options={animalTypes}
                    onChange={(event, object) => {
                      dispatch({
                        type: submitFormActions.setAnimalType,
                        payload: object.value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Порода</label>
                  <SelectBreed
                    animalType={state.animalType}
                    onChange={(event, object) => {
                      dispatch({
                        type: submitFormActions.setAnimalBreed,
                        payload: object.value,
                      });
                    }}
                  />
                </Form.Field>
              </div>
            </div>
          </Form>
          <div className={"submit-form-additional-info-header"}>
            <Header textAlign={"center"}>Заповніть додаткову інформацію</Header>
          </div>
          <Form>
            <div className={"submit-form-additional-info-wrapper"}>
              <Form.Group widths={"equal"}>
                <Form.Field>
                  <label>Колір</label>
                  <SelectColour
                    onChange={(e, { value }) => {
                      dispatch({
                        type: submitFormActions.setAnimalColour,
                        payload: value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Field hidden={searchType === "found"}>
                  <label>Винагорода</label>
                  <Form.Input
                    placeholder={"Винагорода"}
                    icon={"money bill alternate outline"}
                    iconPosition={"left"}
                    onChange={(e, { value }) => {
                      dispatch({
                        type: submitFormActions.setAward,
                        payload: value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Field hidden={searchType === "found"}>
                  <label>Дата втрати</label>
                  <DateInput
                    name={"Дата втрати"}
                    closable={true}
                    placeholder={"Оберіть дату втрати"}
                    value={state.lossDate}
                    onChange={(e, { value }) => {
                      dispatch({
                        type: submitFormActions.setAnimalLossDate,
                        payload: value,
                      });
                    }}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Опис</label>
                <TextArea
                  placeholder="Будь-ласка, опишіть особливі прикмети тварини"
                  onChange={onDescriptionChange}
                />
              </Form.Field>
              <Form.Group widths={"equal"}>
                <Form.Field>
                  <label>Приблизні координати</label>
                  <SelectAddress
                    lossLocation={state.lossLocation}
                    onChangeCoordinates={(coordinates) =>
                      dispatch({
                        type:
                          submitFormActions.setAnimalLossLocationCoordinates,
                        payload: coordinates,
                      })
                    }
                    onChangeLocation={(addressData) =>
                      dispatch({
                        type: submitFormActions.setAnimalLossLocation,
                        payload: addressData,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field hidden={searchType === "found"}>
                  <label>Радіус пошуку</label>
                  <SelectRadius
                    value={state.allowedRadius}
                    onChange={(e, { value }) => {
                      dispatch({
                        type: submitFormActions.setAllowedRadius,
                        payload: value,
                      });
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </div>
            <Form.Group widths={"equal"}>
              <Form.Button
                fluid
                onClick={() => {
                  navigate(`/${searchType}`);
                }}
              >
                Повернутись
              </Form.Button>
              <Form.Button
                disabled={!state.animalImageLink}
                fluid
                onClick={() => {
                  dispatch({
                    type: submitFormActions.setLoading,
                    payload: true,
                  });
                  const {
                    shouldNameNotBeValidated,
                    isBeingSubmitted,
                    lossLocation,
                    ...dataToBeSent
                  } = state;

                  const postURL = new URL(`${config.hostname}/pet`);
                  fetch(postURL, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: getAuthHeader(),
                    },
                    body: JSON.stringify({ ...dataToBeSent, type: searchType }),
                  }).then(() => {
                    dispatch({
                      type: submitFormActions.setLoading,
                      payload: false,
                    });
                    navigate(`/${searchType}`);
                  });
                }}
              >
                Створити
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </>
  );
};

export default SubmitForm;
