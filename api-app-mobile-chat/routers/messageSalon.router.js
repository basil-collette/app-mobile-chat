const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const MessageSalonMiddleWares = require('../middlewares/MessageSalonMiddlewares');

router.get('/getall/:idSalon', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.getDiscussion);

router.post('/send', UserMiddlewares.IsAuthentified, MessageSalonMiddleWares.prePersist, MessageSalonMiddleWares.sendMessage);

module.exports = router;