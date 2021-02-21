import { navigate } from "@reach/router";
import { getAuthHeader } from "../Auth/firebaseService";
import { config } from "../config";

export const SET_PETS = 'SET_PETS';
export const SET_LOADER = "SET_LOADER";

export const loadPetsWithQuery = (query) => (dispatch, getStore) => {
	const url = new URL(`${config.hostname}/pet/get`);
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: getAuthHeader(),
		},
		body: JSON.stringify(query),
	}).then(async (response) => {
		if (response.ok) {
			const pets = await response.json();

			dispatch({
				type: SET_PETS,
				pets,
			});
		} else {
			console.error(response);
		}
	});
};

export const findByImage = (petId) => (dispatch, getStore) => {
	const url = new URL(`${config.hostname}/pet/photo/${petId}`);
    console.log('SEND REQUEST', url);
	fetch(url, {
		method: "GET",
		headers: {
			Authorization: getAuthHeader(),
		},
	}).then(async (response) => {
		if (response.ok) {
			const pets = await response.json();

            console.log(pets);
			dispatch({
				type: SET_PETS,
				pets,
			});
			navigate("/photo-result");
		} else {
			console.error(response);
		}
	});
};

export const setLoaderMainPage=(isLoading)=>(dispatch, getStore) => {
	dispatch({
		type:SET_LOADER,
		value:isLoading
	})
}