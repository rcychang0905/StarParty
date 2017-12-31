// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
function sendUploadToGCS(req) {
  if (!req.files) {
    return;
  }

  _.forEach(req.files, (file) => {
    const gcsname = `${Date.now()}_${file[0].originalname}`;
    const bucketFile = bucket.file(gcsname);
    bucketFile.createWriteStream({
      metadata: {
        contentType: file[0].mimetype
      }
    })
      .on('error', err => err)
      .on('finish', () =>
        bucketFile.makePublic()
      )
      .end(bucketFile.buffer);
    req.body[file[0].fieldname] = getPublicUrl(gcsname);
  });
}

// [END process]

const imageFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  return cb(null, true);
};

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
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
// [END multer]


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};
