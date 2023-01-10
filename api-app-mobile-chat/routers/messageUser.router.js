const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageUserMiddleWares = require('../middlewares/MessageUserMiddleWares');

router.get('/getall/:idUser', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.getAllMessage);

router.post('/send', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.prePersist, MessageUserMiddleWares.sendMessage);

router.get('/delete/:idUser', UserMiddlewares.IsAuthentified, UserMiddlewares.isAdmin, MessageUserMiddleWares.deleteMessage);

module.exports = router;