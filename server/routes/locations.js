'use strict';
const express = require('express');
const router = express.Router();
const LocationController = require('../controllers').Locations;

router.route('/').get(LocationController.getAll);
router.route('/').post(LocationController.create);

router.route('/:id').get(LocationController.getOne);
router.route('/:id').put(LocationController.update);
router.route('/:id').delete(LocationController.deleteOne);

router.route('/name/:name').get(LocationController.getIdByName);

module.exports = router;
