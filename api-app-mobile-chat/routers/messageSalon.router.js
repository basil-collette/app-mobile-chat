const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageSalonMiddleWares = require('../middlewares/MessageSalonMiddleWares');

router.get('/getall/:idSalon', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.getAllMessage);

router.post('/send', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.prePersist, MessageSalonMiddleWares.sendMessage);

router.get('/delete/:idSalon/:idMessage', UserMiddlewares.IsAuthentified, UserMiddlewares.isAdmin, MessageSalonMiddleWares.deleteMessage);

module.exports = router;