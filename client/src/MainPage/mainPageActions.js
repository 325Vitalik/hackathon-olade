export const SET_ROUTE_TO_REDIRECT = "SET_ROUTE_TO_REDIRECT";
export const SET_TYPE = "SET_TYPE";

export const setRouteToRedirect = (route) => (dispatch, getStore) => {
	dispatch({
		type: SET_ROUTE_TO_REDIRECT,
		route,
	});
};

export const setSearchVariant = (tab)=>(dispatch, getStore) => {
	console.log(tab);
	dispatch({
		type: SET_TYPE,
		tab,
	});
};