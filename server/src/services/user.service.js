import { InvalidRequestError, NotFoundError } from './errors';
import { petFinderDbService } from './petFinderDb.service';

const getUserDocument = async (uid) => {
	if (!uid) {
		throw new InvalidRequestError('User uid not specified');
	}

	const userCollection = await petFinderDbService.getUserCollection();
	const userDocument = await userCollection.findOne({ _id: uid });

	if (!userDocument) {
		throw new NotFoundError(`User with uid (${uid}) not found`);
	}

	return {
		uid,
		...userDocument,
	};
};

const generateUserDocument = async (user) => {
	if (!user) {
		throw new InvalidRequestError('User should be an object');
	}

	const userCollection = await petFinderDbService.getUserCollection();
	await userCollection.insert({ ...user, _id: user.uid });

	return getUserDocument(user.uid);
};

export const userService = {
	getUserDocument,
	generateUserDocument,
};
