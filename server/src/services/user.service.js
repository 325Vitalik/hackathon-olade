import { InvalidRequestError, NotFoundError } from "./errors";

const admin = require("firebase-admin");

const serviceAccount = require("../configs/firebase_auth_config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

export const userService = {
    generateUserDocument: async (user, additionalData = {}) => {
        if (!user) {
            throw new InvalidRequestError("User should be an object");
        }

        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot = await userRef.get();

        if (!snapshot.exists) {
            const { email, displayName, photoURL } = user;
            
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData,
            });
        }

        return userService.getUserDocument(user.uid);
    },

    getUserDocument: async (uid) => {
        if (!uid) {
            throw new InvalidRequestError("User uid not specified");
        }

        const userDocument = await firestore.doc(`users/${uid}`).get();

        if (!userDocument.exists) {
            throw new NotFoundError(`User with uid (${uid}) not found`);
        }

        return {
            uid,
            ...userDocument.data(),
        };
    },
};
