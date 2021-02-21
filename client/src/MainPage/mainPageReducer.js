import { SET_ROUTE_TO_REDIRECT, SET_TYPE } from "./mainPageActions";

const initialState = {
	routeToRedirect: "search",
	searchType: "search"
};

export default function main(state = initialState, action) {
	switch (action.type) {
		case SET_ROUTE_TO_REDIRECT:
			return { ...state, routeToRedirect: action.route };
		case SET_TYPE:
			return {...state, searchType:action.tab}
		default:
			return state;
	}
}
