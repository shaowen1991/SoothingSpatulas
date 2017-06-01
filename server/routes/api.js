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

voiceRecognize.asyncRecognize('jack_1.aac', 'FLAC', 22050, 'en-US');
module.exports = router;
