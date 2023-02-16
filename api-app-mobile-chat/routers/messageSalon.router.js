const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageSalonMiddleWares = require('../middlewares/MessageSalonMiddleWares');

router.get('/getall/:idSalon', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.getDiscussion);

router.post('/send', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.prePersist, MessageSalonMiddleWares.sendMessage);

module.exports = router;