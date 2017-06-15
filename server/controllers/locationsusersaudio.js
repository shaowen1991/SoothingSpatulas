'use strict';
const models = require('../../db/models');
const fs = require('fs');
const path = require('path');
const { voiceRecognize } = require('../service/voiceRecognize.js');
/* ----------------------------------
            AWS config
---------------------------------- */
const AWS = require('aws-sdk');
const AWSCredentials = require('../service/AWS.json');
AWS.config.credentials = AWSCredentials;
const s3 = new AWS.S3({credentials: AWSCredentials});

// module.exports.getAll = (req, res) => {
//   models.LocationUser.fetchAll()
//     .then(locationsUsers => {
//       res.status(200).send(locationsUsers);
//     })
//     .catch(err => {
//       // This code indicates an outside service (the database) did not respond in time
//       res.status(503).send(err);
//     });
// };

module.exports.create = (req, res) => {
  const audioBuffer = Buffer.from(req.body.buffer, 'base64');
  const filename = req.body.filename;
  const uploadParams = {
    Bucket: 'momentouseraudio',
    Key: filename,
    Body: audioBuffer
  }
  /* ----------------------------------
            Upload to S3
  ---------------------------------- */
  s3.upload (uploadParams,  (err, data) => {
    if (err) {
      console.log("Error when upload to S3", err);
    } if (data) {
      console.log("Upload to S3 Success", data.Location);
    }
  });
  /* ----------------------------------
            Save it locally 
  ---------------------------------- */
  const filepath = path.join(__dirname, '../service/user_audio/' + filename);
  console.log('saving file path: ', filepath);
  
  fs.writeFile(filepath, audioBuffer, (err) => {
    if (err) {
      res.status(500).send({err});
      console.log('failed write file');
    }
    else {
      res.status(201);
      console.log('success write file');
      /* --------------------------------------
       Start voiceRecognize service as promise
      -------------------------------------- */
      voiceRecognize(filename)
      .then((transcription) => {
        fs.unlink(filepath);
        /* --------------------------------------------------
        Store in database with transcription and comment audio
        -------------------------------------------------- */
        models.LocationUser.forge({
          comment: transcription,
          comment_audio: filename,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          rating: req.body.rating,
          user_id: req.body.user_id,
          name: req.body.name,
          location_id: req.body.location_id
        })
        .save()
        .then(() => {
          res.status(201).send(transcription);
        })
        .catch(err => {
          res.status(500).send(err);
        });           
      })
      .catch((err) => {
        console.error('ERROR in voiceRecognize:', err);
        fs.unlink(filepath);
        res.status(500).send(err);
      })
    }
  });
};

module.exports.getOne = (req, res) => {
  const downloadParams = {
    Bucket: 'momentouseraudio',
    Key: req.params.filename,
  }  

  s3.getObject(downloadParams, (err, data) => {
    if (err) {
      console.log(err, err.stack); 
      res.status(500).send(err);
    }
    else {
      console.log('getAudio buffer'); 
      const audioBuffer = data.Body.toString('base64');
      res.status(201).send(audioBuffer);  
    }          
  });
};

// module.exports.update = (req, res) => {
//   models.LocationUser.where({ id: req.params.id }).fetch()
//     .then(locationUser => {
//       if (!locationUser) {
//         throw locationUser;
//       }
//       return locationUser.save(req.body, { method: 'update' });
//     })
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .error(err => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// module.exports.deleteOne = (req, res) => {
//   models.LocationUser.where({ id: req.params.id }).fetch()
//     .then(locationUser => {
//       if (!locationUser) {
//         throw locationUser;
//       }
//       return locationUser.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
