const express = require('express');
const router = express.Router();
const AdminMiddlewares = require('../middlewares/AdminMiddlewares');
const SalonMiddleWares = require('../middlewares/SalonMiddleWares');

router.delete('/delete/user/:idUser', AdminMiddlewares.deleteUser);

router.delete('/delete/salonmessage/:idMessage', AdminMiddlewares.deleteSalonMessage);

router.delete('/delete/usermessage/:idMessage', AdminMiddlewares.deleteUserMessage);

router.use('/delete/salon/:idSalon', SalonMiddleWares.deleteSalon);

router.use('/create/salon',AdminMiddlewares.createSalon);

router.use('/getall/user',AdminMiddlewares.getAllUser);

router.use('/update/salon/:idSalon',AdminMiddlewares.updateSalon);

module.exports = router;