const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageUserMiddleWares = require('../middlewares/MessageUserMiddleWares');

router.get('/getdiscussion/:idUserReceiver', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.getDiscussion);

router.get('/getall', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.getAllMessage);

router.post('/send', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.prePersist, MessageUserMiddleWares.sendMessage);

router.delete('/delete/:idMessageUser', UserMiddlewares.IsAuthentified, UserMiddlewares.isAdmin, MessageUserMiddleWares.deleteMessage);

module.exports = router;