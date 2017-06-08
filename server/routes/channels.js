'use strict';
const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers').Channels;

router.route('/').get(ChannelController.getAll)
router.route('/user').get(ChannelController.getUser)
router.route('/userDetails').get(ChannelController.getOtherUser)

module.exports = router;
