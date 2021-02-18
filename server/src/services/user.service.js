import { InvalidRequestError, NotFoundError } from "./errors";
import { firestore } from "./firebase.service";

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
