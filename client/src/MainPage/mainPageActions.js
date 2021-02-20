export const SET_ROUTE_TO_REDIRECT = "SET_ROUTE_TO_REDIRECT";

export const setRouteToRedirect = (route) => (dispatch, getStore) => {
	dispatch({
		type: SET_ROUTE_TO_REDIRECT,
		route,
	});
};
