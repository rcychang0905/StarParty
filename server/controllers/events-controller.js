import * as eventsModel from '../models/events-model';

export {
  list,
  add
};

function list(req, res) {
  eventsModel.list((err, entities) => {
    if (err) {
      res.status(500).send(err.Error);
    } else {
      res.json(entities);
    }
  });
}

function add(req, res) {
  eventsModel.add(req.body, (err, entity) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(entity);
    }
  });
}

