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
        next(err);
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
        next(err);
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
            next(new Error("error during sending private message"));
        }
    } catch (err) {
        next(new Error("error during sending private message"));
    }

    try {
        SocketHelper.emitUserMsg(req.body.idUserSender, req.body.idUserReceiver, message);
    } catch (err) {
        next(new Error("error_during_socket_emit"));
    }

    res.status(201);
    res.send(message);
    next();
}

/**
 * send a a message to salon
 * GET http://127.0.0.1:3000/messageuser/delete/:idMessageUser
 */
const deleteMessage = async (req, res, next) => {
    try {
        const idMessageUser = req.params.idMessageUser;
        const result = await MessageUserRepository.delete(idMessageUser);

        res.status(200);
        res.send(result);
        next();
        
    } catch (err) {
        next(new Error("error_during_deleting_message"));
    }
}

module.exports = {
    getDiscussion,
    prePersist,
    sendMessage,
    deleteMessage
};