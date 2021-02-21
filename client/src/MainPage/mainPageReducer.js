import { SET_ROUTE_TO_REDIRECT } from "./mainPageActions";

const initialState = {
	routeToRedirect: "search",
};

export default function main(state = initialState, action) {
	switch (action.type) {
		case SET_ROUTE_TO_REDIRECT:
			return { ...state, routeToRedirect: action.route };
		default:
			return state;
	}
}
