const express = require('express');
const router = express.Router();
const UserController = new(require('../controllers/UserController'));
const RoleController = new(require('../controllers/RoleController'));

module.exports = router;