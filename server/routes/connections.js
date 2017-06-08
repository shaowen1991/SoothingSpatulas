'use strict';
const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers').Connections;

router.route('/').get(ConnectionController.getAll);
router.route('/').post(ConnectionController.create);
router.route('/:id').delete(ConnectionController.deleteOne);

module.exports = router;
