'use strict';
const express = require('express');
const router = express.Router();
const LocationUserAudioController = require('../controllers').LocationsUsersAudio;

// router.route('/').get(LocationUserAudioController.getAll);
router.route('/').post(LocationUserAudioController.create);

router.route('/:filename').get(LocationUserAudioController.getOne);
// router.route('/:filename').put(LocationUserAudioController.update);
// router.route('/:filename').delete(LocationUserAudioController.deleteOne);

module.exports = router;
