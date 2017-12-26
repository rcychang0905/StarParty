import express from 'express';
import * as eventsController from '../controllers/events-controller';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/events', eventsController.list);

router.post('/:events', eventsController.add);

export default router;
