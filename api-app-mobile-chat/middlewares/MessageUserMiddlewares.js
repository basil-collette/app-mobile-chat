const MessageUserRepository = require('../repository/MessageUserRepository');
const Sequelize = require("sequelize");
const Op = require("sequelize").Op;
const SocketHelper = require('../helpers/SocketHelper');

/**
 * get all message from salon
 * GET http://127.0.0.1:3000/messageuser/getdiscussion/:idUserReceiver/
 */
const getDiscussion = async (req, res, next) => {
    try {
        const idUserSender = res.locals.authentifiedUser.idUser;
        const idUserReceiver = req.params.idUserReceiver;

        const wheres = [
            {fk_id_user_sender: {[Op.in]: [idUserReceiver, idUserSender]}},
            {fk_id_user_receiver: {[Op.in]: [idUserReceiver, idUserSender]}}
        ]

        if (idUserSender != idUserReceiver) wheres.push({fk_id_user_sender: {[Op.not]: Sequelize.col('fk_id_user_receiver')}});

        let messagesUser = await MessageUserRepository.getDiscussion({[Op.and]: wheres});
        
        res.status(200);
        res.send(messagesUser);
        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).send('error during getting private discussion');
    }
}

/**
 * process before a messageSalon insert
 * valorise the fields 'createdAt' & idUserSender
 */
const prePersist = async (req, res, next) => {
    try {
        //set createdAt
        req.body.createdAt = new Date();

        //set idUser of the authentified user
        req.body.idUserSender = res.locals.authentifiedUser.idUser;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error during prepersist private message');
    }
}

/**
 * send a a message to salon
 * POST http://127.0.0.1:3000/messageuser/send/
 */
const sendMessage = async (req, res, next) => {
    /*
    {
        "content": "test",
        "idUserReceiver": 1
    }
    */
    let message;

    try {
        message = await MessageUserRepository.insert(req.body);
        if (!message) {
            res.status(500).send('error during sending private message');
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('error during sending private message');
        return;
    }

    try {
        SocketHelper.emitUserMsg(req.body.idUserSender, req.body.idUserReceiver, message);
    } catch (err) {
        console.log(err);
        /*
        res.status(500).send('error_during_socket_emit');
        */
    }

    res.status(201);
    res.send(message);
    next();
}

module.exports = {
    getDiscussion,
    prePersist,
    sendMessage
};