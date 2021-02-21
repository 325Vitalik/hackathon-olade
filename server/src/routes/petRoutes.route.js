import { Router } from 'express';
import { petService } from '../services/pets.service';
import { getUidFromRequest } from '../services/firebase.service';

const router = new Router();

router.get('/:petid', async (req, res, next) => {
	try {
		const petid = req.params.petid;
		const pet = await petService.getPetDocumentById(petid);
		res.send(pet);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const { query } = req.body;
		const petDocuments = await petService.getPetDocuments(query);
		res.send(petDocuments);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const currentUserUid = getUidFromRequest(req);
		const pet = req.body;
		const petId = await petService.insertPetDocument(pet, currentUserUid);
		res.send(petId);
	} catch (error) {
		next(error);
	}
});

router.get('/photo/:petid', async (req, res, next) => {
	try {
		const petid = req.params.petid;
		const pets = petService.getPetsWithSameImage(petid);
		res.send(pets);
	} catch (error) {
		next(error);
	}
});

export { router as petRoutes };
