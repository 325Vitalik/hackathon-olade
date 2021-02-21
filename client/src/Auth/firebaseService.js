import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyB3ocaslSkJF_-Ck3U6RhdGTcnBSoikZUM",
	authDomain: "hackathon-olade.firebaseapp.com",
	projectId: "hackathon-olade",
	storageBucket: "hackathon-olade.appspot.com",
	messagingSenderId: "467236487000",
	appId: "1:467236487000:web:b95e6aa9f1d81dff62af2d",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
	return await auth.signInWithPopup(provider);
};

export const registerNewUser = async ({ email, password }) => {
	return await auth.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = async ({ email, password }) => {
	return await auth.signInWithEmailAndPassword(email, password);
};

export const getIdToken = async () => await auth.currentUser?.getIdToken();

export const getAuthHeader = () => "Bearer " + localStorage.getItem("@token");

export const getCurrentUser = () => auth.currentUser;

export const signOutCurrentUser = async () => await auth.signOut();