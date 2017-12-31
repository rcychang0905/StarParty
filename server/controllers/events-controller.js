import * as _ from 'underscore';
import * as eventsModel from '../models/events-model';
import * as images from '../helpers/images';

export {
  list,
  getEventById,
  getEventLocationById,
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
    .then(() => {
      const newReq = _.extend({}, req);
      addImageForEvent(newReq);
      return newReq;
    })
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

function addImageForEvent(req) {
  return images.sendUploadToGCS(req);
}

