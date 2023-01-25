const express = require('express');
const router = express.Router();
const AdminMiddlewares = require('../middlewares/AdminMiddlewares');

router.delete('/delete/user/:idUser', AdminMiddlewares.deleteUser);

router.delete('/delete/salonmessage/:idMessage', AdminMiddlewares.deleteSalonMessage);

router.delete('/delete/usermessage/:idMessage', AdminMiddlewares.deleteUserMessage);

module.exports = router;