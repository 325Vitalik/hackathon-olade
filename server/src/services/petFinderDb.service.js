import { config } from '../configs/config';
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(config.mongodbClientUri, { useUnifiedTopology: true });

let petFinderDb = null;

const getPetFinderDb = async () => {
	if (mongoClient.isConnected() && petFinderDb !== null) {
		return petFinderDb;
	}

	const client = await mongoClient.connect();
	petFinderDb = client.db('petFinderDb');

	return petFinderDb;
};

const getUserCollection = async () => {
	const db = await getPetFinderDb();

	return db.collection('users');
};

const getPetCollection = async () => {
	const db = await getPetFinderDb();

	return db.collection('pets')
}

export const petFinderDbService = { getPetFinderDb, getUserCollection, getPetCollection };
