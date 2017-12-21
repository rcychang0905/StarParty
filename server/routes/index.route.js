import express from 'express';
import cloudsql from '../models/cloudsql';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/events/createSchema', (req, res) => {
  cloudsql.createSchema();
  res.send('OK');
});

router.get('/events', (req, res) => {
  cloudsql.list((err, entities) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      items: entities
    });
  });
});

router.post('/:events', (req, res, next) => {
  cloudsql.add(req.body, (err, entity) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(entity);
  });
});

export default router;
