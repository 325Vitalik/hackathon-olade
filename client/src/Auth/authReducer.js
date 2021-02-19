import { SET_CURRENT_USER_DATA } from "./authActions";

const initialState = {
	currentUser: null,
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER_DATA:
			return { ...state, currentUser: action.user };
		default:
			return state;
	}
}
