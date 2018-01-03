import express from 'express';
import * as eventsController from '../controllers/events-controller';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', eventsController.getAllEvent);

router.get('/current', eventsController.getCurrentEvent);

router.get('/:id', eventsController.getEventById);

router.get('/location/:id', eventsController.getEventLocationById);

router.post('/', eventsController.addEntryForEvent);

export default router;
