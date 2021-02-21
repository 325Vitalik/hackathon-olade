import { getAuthHeader } from "../Auth/firebaseService";
import { config } from "../config";

export const SET_PETS = 'SET_PETS';

export const loadPetsWithQuery = (query) => (dispatch, getStore) => {
	const url = new URL(`${config.hostname}/pet/get`);
	fetch(url, {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: getAuthHeader(),
		},
        body: JSON.stringify(query)
	}).then(async response => {
        if(response.ok) {
            const pets = await response.json();

            dispatch({
                type: SET_PETS,
                pets
            })
        } else {
            console.error(response);
        }
    })
};
