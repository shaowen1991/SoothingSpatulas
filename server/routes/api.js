'use strict';
const express = require('express');
const router = express.Router();
const voiceRecognize = require('../service/voiceRecognize.js');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/locations')
  .get((req, res) => {
    let lat = req.query.lat;
    let lng = req.query.lng;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=5000&rankby=prominence&key=AIzaSyBD5VDZHAMghzun891D2rAZCOgKo7xM6Wc`;
    var maps = {url: url};
    request(maps, function(err, response, body) {
      if (err) {
        throw err;
      }
      else {
        res.send(JSON.parse(body));
      }
    });
  })

module.exports = router;
