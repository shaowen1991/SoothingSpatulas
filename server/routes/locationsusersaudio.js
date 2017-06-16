'use strict';
const express = require('express');
const router = express.Router();
const LocationUserAudioController = require('../controllers').LocationsUsersAudio;

router.route('/').post(LocationUserAudioController.create);
router.route('/:filename').get(LocationUserAudioController.getOne);

module.exports = router;
