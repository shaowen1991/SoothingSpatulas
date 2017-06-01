'use strict';
const express = require('express');
const router = express.Router();
const LocationUserAudioController = require('../controllers').LocationsUsersAudio;

router.route('/').get(LocationUserAudioController.getAll);
router.route('/').post(LocationUserAudioController.create);

router.route('/:id').get(LocationUserAudioController.getOne);
router.route('/:id').put(LocationUserAudioController.update);
router.route('/:id').delete(LocationUserAudioController.deleteOne);

module.exports = router;
