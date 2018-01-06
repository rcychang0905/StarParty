import Multer from 'multer';
import Promise from 'bluebird';
import * as _ from 'underscore';
import Storage from '@google-cloud/storage';
import config from '../../config/config';

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');
const storage = Storage({
  projectId: config.get('GCLOUD_PROJECT')
});
const bucket = storage.bucket(CLOUD_BUCKET);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function sendUploadToGCS(req) {
  return new Promise((resolve, reject) => {
    if (!req.files) {
      reject();
    }
    const newReq = _.extend({}, req);
    const files = _.extend({}, newReq.files);

    _.forEach(files, (file, index) => {
      const gcsname = `${Date.now()}_${file[0].originalname}`;
      const bucketFile = bucket.file(gcsname);
      bucketFile.createWriteStream({
        metadata: {
          contentType: file[0].mimetype
        }
      })
        .on('error', err => reject(err))
        .on('finish', () => {
          bucketFile.makePublic();
          newReq.body[file[0].fieldname] = getPublicUrl(gcsname);
          delete files[index];
          if (_.size(files) === 0) {
            resolve(newReq);
          }
        })
        .end(file[0].buffer);
    });
  });
}

const imageFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  return cb(null, true);
};

const multer = Promise.promisify(Multer({
  storage: Multer.MemoryStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
}).fields([
  { name: 'photo1', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
  { name: 'photo3', maxCount: 1 },
]));


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};
