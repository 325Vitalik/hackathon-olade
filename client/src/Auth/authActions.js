import { navigate } from "@reach/router";
import { registerNewUser, signInWithEmailAndPassword, signInWithGoogle } from "./firebaseService";

export const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";

export const signInUsingGoogle = () => async (dispatch, getStore) => {
	const { user: firebaseUser } = await signInWithGoogle();
	const url = new URL(`http://localhost:5000/user/${firebaseUser.uid}`);

	fetch(url).then(async (response) => {
		if (response.ok) {
			const user = await response.json();
			dispatch({
				type: SET_CURRENT_USER_DATA,
				user,
			});
			navigate('/');
		} else if (response.status === 404) {
			const addDocumentUrl = new URL(`http://localhost:5000/user`);
			fetch(addDocumentUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user: firebaseUser }),
			}).then(async (postResponse) => {
				if (postResponse.ok) {
					const user = await postResponse.json();
					dispatch({
						type: SET_CURRENT_USER_DATA,
						user,
					});
					navigate('/');
				} else {
					console.log(postResponse);
				}
			});
		} else {
			console.log(response);
		}
	});
};

export const registerUser = ({ email, password, firstName, lastName }) => async (dispatch, getStore) => {
	const { user } = await registerNewUser({ email, password });
	const url = new URL(`http://localhost:5000/user`);

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user,
			additionalData: {
				firstName,
				lastName,
				displayName: `${firstName} ${lastName}`,
			},
		}),
	}).then(async (response) => {
		if (response.ok) {
			const user = await response.json();
			dispatch({
				type: SET_CURRENT_USER_DATA,
				user,
			});
			navigate('/');
		}
	});
};

export const signInUsingEmailAndPassword = ({ email, password }) => async (dispatch, getStore) => {
	const { user: firebaseUser } = await signInWithEmailAndPassword({ email, password });
	const url = new URL(`http://localhost:5000/user/${firebaseUser.uid}`);

	fetch(url).then(async (response) => {
		if (response.ok) {
			const user = await response.json();
			dispatch({
				type: SET_CURRENT_USER_DATA,
				user,
			});
			navigate('/');
		} else {
			console.error(response);
		}
	});
};
