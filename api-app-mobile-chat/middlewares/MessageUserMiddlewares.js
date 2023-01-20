const UserController = new(require('../controllers/UserController'));
const MessageUserController = new(require('../controllers/MessageUserController'));
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

        let messagesUser = await MessageUserController.getDiscussion({[Op.and]: wheres});
        
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
    let messageSalon;

    try {
        messageSalon = await MessageUserController.insert(req.body);
        if (!messageSalon) {
            throw new Error();
        }
    } catch (err) {
        console.error(err);
        res.status(404);
        res.end('error_during_sending_message');
        next(err);
    }

    try {
        SocketHelper.emitUserMsg(req.body.idUserSender, req.body.idUserReceiver, messageSalon);
    } catch (err) {
        console.error(err);
        res.status(404);
        res.end('error_during_socket_emit');
        next(err);
    }

    res.status(201);
    res.send(messageSalon);
    next();
}

/**
 * send a a message to salon
 * GET http://127.0.0.1:3000/messageuser/delete/:idUser
 */
const deleteMessage = async (req, res, next) => {
    try {
        const userFields = req.body;
        let token = await UserController.login(userFields.email, userFields.password);

        res.status(200);
        res.send(token);
        next();
        
    } catch (err) {
        res.status(404);
        res.end('error_during_deleting_message');
        //next(err);
    }
}

module.exports = {
    getDiscussion,
    prePersist,
    sendMessage,
    deleteMessage
};