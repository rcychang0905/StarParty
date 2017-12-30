import express from 'express';
import * as eventsController from '../controllers/events-controller';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/events', eventsController.list);

router.get('/events/:id', eventsController.getEventById);

router.get('/events/location/:id', eventsController.getEventLocationById);

router.post('/events', eventsController.addEntryForEvent);

export default router;
