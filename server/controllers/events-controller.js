import * as eventsModel from '../models/events-model';

export {
  list,
  getEventById,
  addEntryForEvent
};

function list(req, res) {
  eventsModel.list()
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

function getEventById(req, res) {
  eventsModel.getEventById(req.params.id)
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

function addEntryForEvent(req, res) {
  eventsModel.addEntryForEvent(req.body)
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

