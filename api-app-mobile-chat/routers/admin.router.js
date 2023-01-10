const express = require('express');
const router = express.Router();
const AdminMiddlewares = require('../middlewares/AdminMiddlewares');

router.get('/delete/user/:idUser', AdminMiddlewares.deleteUser);

router.get('/delete/salonmessage/:idMessage', AdminMiddlewares.deleteSalonMessage);

router.get('/delete/usermessage/:idMessage', AdminMiddlewares.deleteUserMessage);

module.exports = router;