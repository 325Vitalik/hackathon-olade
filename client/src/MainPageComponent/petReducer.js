import { SET_PETS } from "./petActions";

const initialState = {
	currentUser: null,
};

export default function pets(state = initialState, action) {
	switch (action.type) {
		case SET_PETS:
			return { ...state, pets: action.pets };
		default:
			return state;
	}
}
