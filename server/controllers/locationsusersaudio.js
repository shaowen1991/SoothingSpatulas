'use strict';
const models = require('../../db/models');
const fs = require('fs');
const path = require('path');
const voiceRecognize = require('../service/voiceRecognize.js');

module.exports.getAll = (req, res) => {
  models.LocationUser.fetchAll()
    .then(locationsUsers => {
      res.status(200).send(locationsUsers);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  console.log('req.body:', req.body);
  const filepath = path.join(__dirname, '../service/user_audio/' + 'temp.aac');
  // const filepath = '../service/user_audio/' + 'temp.aac';

  console.log('saving file path: ', filepath);
  fs.writeFile(filepath, req.body, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      fs.stat(filepath, (err, stats)=> {
        console.log('file stats: ', stats);
      })
      // let transcription = voiceRecognize.asyncRecognize('temp.aac', 'FLAC', 22050, 'en-US');
      // res.status(201).send({transcription: transcription});    
    }
  });
};

module.exports.getOne = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      res.status(200).send(locationUser);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      return locationUser.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.LocationUser.where({ id: req.params.id }).fetch()
    .then(locationUser => {
      if (!locationUser) {
        throw locationUser;
      }
      return locationUser.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
