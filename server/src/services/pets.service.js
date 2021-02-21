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

	const { allowedRadius, lossLocationCoordinates, ...filteredQuery } = query;

	return await petCollection
		.aggregate([
			{ $match: filteredQuery },
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user',
				},
			},
			{ $sort: { [sortCriteria]: 1 } },
		])
		.toArray()
		.then((documents) =>
			documents
				?.filter((doc) => {
					if (!query.allowedRadius || !doc.lossLocationCoordinates || !query.lossLocationCoordinates) {
						return true;
					}

					const res = compareCoordinatesService.isInRadius(
						doc.lossLocationCoordinates,
						query.lossLocationCoordinates,
						query.allowedRadius
					);

					return res;
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
		const selectedDocument = await petCollection.findOne({ _id: petId });

		const sortCriteria = getSortFromType(selectedDocument.type);

		let samePets = [];
		petCollection.aggregate([{ $sort:  { [sortCriteria]: 1 }}]).forEach(
			(document) => {
				// console.log(document);
				if (hammingDistance(selectedDocument.imgHash, document.imgHash) >= 0.11) {
					console.log('AAAAAAA______');
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
