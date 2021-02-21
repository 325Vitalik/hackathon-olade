import { getUidFromRequest } from './firebase.service';
import { petFinderDbService } from './petFinderDb.service';
import { uid } from 'uid';
import { hashService } from './hash.service';
import { compareCoordinatesService } from './compareCoordinates.servise';

const getSortFromType = (type) => {
	if (type === 'search') {
		return 'dateLost';
	}

	return 'createdAt';
};

const getPetDocuments = async (query) => {
	const petCollection = await petFinderDbService.getPetCollection();
	const sortCriteria = getSortFromType(query.type);

	const {allowedRadius,lossLocationCoordinates,...filteredQuery}=query

	return await petCollection
		.aggregate([
			{ $match: filteredQuery },
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
		.then((documents) =>
			documents
				?.filter((doc) => {
					console.log(query, doc);
					if (!query.allowRadius || !doc.lossLocationCoordinates || !query.lossLocationCoordinates) {
						return true;
					}

					return compareCoordinatesService.isInRadius(
						doc.lossLocationCoordinates,
						query.lossLocationCoordinates,
						query.allowRadius
					);
				})
				.map((doc) => ({ ...doc, user: doc.user[0] }))
		);
};

const getPetDocumentById = async (petId) => {
	const petCollection = await petFinderDbService.getPetCollection();
	const userCollection = await petFinderDbService.getUserCollection();

	let pet = await petCollection.findOne({ _id: petId }).catch(console.log);
	pet.user = await userCollection.findOne({ _id: pet?.userId });

	return pet;
};

const insertPetDocument = async (petDocument, userId) => {
	const petCollection = await petFinderDbService.getPetCollection();

	const imgHash = await hashService.generateHash(petDocument.animalImageLink);

	const _id = uid(28);
	await petCollection.insertOne({ ...petDocument, userId, _id, imgHash, createdAt: new Date() });

	return { petId: _id };
};

const getPetsWithSameImage = (petId) => {
	return new Promise(async (resolve, reject) => {
		const petCollection = await petFinderDbService.getPetCollection();
		const sortCriteria = getSortFromType(query.animalType);

		const selectedCollection = await petCollection.findOne({ _id: petId });

		let samePets = [];
		petCollection.aggregate([{ $sort: sortCriteria }]).forEach(
			(document) => {
				if (hammingDistance(selectedCollection.imgHash, document.imgHash) >= 0.8) {
					samePets.push(document);
				}
			},
			(err) => (err ? reject(err) : resolve(samePets))
		);
	});
};

const hammingDistance = (a, b) => {
	let distance = 0;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			distance++;
		}
	}
	const m = Math.pow(10, 2);
	return Math.round((1 - distance / 64) * m) / m;
};

export const petService = {
	getPetDocuments,
	getPetDocumentById,
	insertPetDocument,
	getPetsWithSameImage,
};
