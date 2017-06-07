'use strict';
const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers').Channels;

router.route('/').get(ChatController.getAll)
router.route('/user').get(ChatController.getUser)
router.route('/userDetails').get(ChatController.getOtherUser)
  // below: sorting query for desired number of users:


module.exports = router;
