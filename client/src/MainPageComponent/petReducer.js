import { SET_PETS, SET_LOADER } from "./petActions";

const initialState = {
	currentUser: null,
	isLoading:false
};

export default function pets(state = initialState, action) {
	switch (action.type) {
		case SET_PETS:
			return { ...state, pets: action.pets };
		case SET_LOADER:
			return { ...state, isLoading: action.value };
		default:
			return state;
	}
}
