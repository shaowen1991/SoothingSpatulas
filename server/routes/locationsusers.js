'use strict';
const express = require('express');
const router = express.Router();
const LocationUserController = require('../controllers').LocationsUsers;

router.route('/').get(LocationUserController.getAll);
router.route('/').post(LocationUserController.create);

router.route('/:id').get(LocationUserController.getOne);
router.route('/:id').put(LocationUserController.update);
router.route('/:id').delete(LocationUserController.deleteOne);

module.exports = router;
