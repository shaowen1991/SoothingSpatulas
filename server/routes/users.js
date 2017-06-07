'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;

router.route('/').get(UserController.getAll);
router.route('/').post(UserController.create);

router.route('/:id').get(UserController.getOne);
router.route('/:id').put(UserController.update);
router.route('/:id').delete(UserController.deleteOne);

router.route('/email/:email').get(UserController.getIdByEmail);

module.exports = router;
