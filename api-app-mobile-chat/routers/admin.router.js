const express = require('express');
const router = express.Router();
const AdminMiddlewares = require('../middlewares/AdminMiddlewares');

router.get('/getall/user', AdminMiddlewares.getAllUser);
router.delete('/delete/user/:idUser', AdminMiddlewares.deleteUser);

router.post('/create/salon', AdminMiddlewares.createSalon);
router.put('/update/salon/:idSalon', AdminMiddlewares.updateSalon);
router.use('/delete/salon/:idSalon', AdminMiddlewares.deleteSalon);

router.get('/getall/salonmessage', AdminMiddlewares.getAllRoomMessages);
router.delete('/delete/salonmessage/:idMessage', AdminMiddlewares.deleteRoomMessage);

router.get('/getall/usermessage', AdminMiddlewares.getAllUserMessages);
router.delete('/delete/usermessage/:idMessage', AdminMiddlewares.deleteUserMessage);

module.exports = router;