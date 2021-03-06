import * as _ from 'underscore';
import * as eventsModel from '../models/events-model';
import * as images from '../helpers/images';

export {
  getAllEvent,
  getCurrentEvent,
  getEventById,
  getEventLocationById,
  addEntryForEvent
};

function getAllEvent(req, res) {
  eventsModel.getAllEvent()
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

function getCurrentEvent(req, res) {
  eventsModel.getCurrentEvent()
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

function getEventLocationById(req, res) {
  eventsModel.getEventLocationById(req.params.id)
    .then(entities =>
      res.json(entities)
    )
    .catch(err =>
      res.status(500).send(err)
    );
}

function addEntryForEvent(req, res) {
  images.multer(req, res)
    .then(() =>
      images.sendUploadToGCS(req)
    )
    .then((newReq) => {
      eventsModel.addEntryForEvent(newReq.body)
        .then(entities =>
          res.json(entities)
        )
        .catch(err =>
          res.status(500).send(err)
        );
    })
    .catch(err =>
      res.status(500).send({err: err.message})
    );
}

