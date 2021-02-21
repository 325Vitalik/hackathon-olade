import { getUidFromRequest } from './firebase.service';
import { petFinderDbService } from './petFinderDb.service';
import { uid } from 'uid';

const getSortFromType = (type) => {
	if (type) {
		return 'dateLost';
	}

	return 'createdAt';
};

const getPetDocuments = async (query) => {
	const petCollection = await petFinderDbService.getPetCollection();
	const sortCriteria = getSortFromType(query.type);

	return await petCollection
		.aggregate([
			{ $match: query },
			{ $sort: { [sortCriteria]: 1 } },
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user',
				},
			},
		])
		.toArray()
		.then((documents) => documents.map((doc) => ({ ...doc, user: doc.user[0] })));
};

const getPetDocumentById = async (petId) => {
	const petCollection = await petFinderDbService.getPetCollection();
    const userCollection = await petFinderDbService.getUserCollection();

	let pet = await petCollection.findOne({ _id: petId });
    pet.user = await userCollection.findOne({ _id: pet?.userId });

    return pet;
};

const insertPetDocument = async (petDocument, userId) => {
	const petCollection = await petFinderDbService.getPetCollection();

	const { ops } = await petCollection.insertOne({ ...petDocument, userId, _id: uid(28) });

	return ops;
};

export const petService = {
	getPetDocuments,
	getPetDocumentById,
	insertPetDocument,
};
