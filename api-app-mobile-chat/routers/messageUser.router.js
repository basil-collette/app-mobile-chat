const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageUserMiddleWares = require('../middlewares/MessageUserMiddleWares');

router.get('/getdiscussion/:idUserReceiver', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.getDiscussion);

router.post('/send', UserMiddlewares.IsAuthentified, MessageUserMiddleWares.prePersist, MessageUserMiddleWares.sendMessage);

module.exports = router;