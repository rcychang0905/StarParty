import * as eventsModel from '../models/events-model';

export {
  list,
  add
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

function add(req, res) {
  eventsModel.add()
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

