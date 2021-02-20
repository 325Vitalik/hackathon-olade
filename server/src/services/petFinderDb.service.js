import { config } from '../configs/config';
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(config.mongodbClientUri, { useUnifiedTopology: true });

const petFinderDb = null;

const getPetFinderDb = async () => {
	if (mongoClient.isConnected() && petFinderDb !== null) {
		return petFinderDb;
	}

	await mongoClient.connect();
	petFinderDb = mongoClient.db('petFinderDb');

	return petFinderDb;
};

const getUserCollection = async () => {
	const db = await getPetFinderDb();

	return petFinderDb.collection('users');
};

export const petFinderDbService = { getPetFinderDb, getUserCollection };
