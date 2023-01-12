const UserController = new(require('../controllers/UserController'));
const MessageUserController = new(require('../controllers/MessageUserController'));

/**
 * get all message from salon
 * GET http://127.0.0.1:3000/messageuser/getall/:idUser
 */
const getAllMessage = async (req, res, next) => {
    try {
        let messagesSalon = await MessageUserController.getAll();

        res.status(200);
        res.send(messagesSalon);
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
 * POST http://127.0.0.1:3000/messageuser/send
 */
const sendMessage = async (req, res, next) => {
    /*
    {
        "content": "test",
        "idUserReceiver": 1
    }
    */
    try {
        const messageSalon = await MessageUserController.insert(req.body);
        
        if (messageSalon) {
            res.status(201);
            res.send(messageSalon);
            next();
        } else {
            res.status(404);
            res.end();
        }
        
    } catch (err) {
        res.status(404);
        res.end('error_during_sending_message');
        //next(err);
    }
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
    getAllMessage,
    prePersist,
    sendMessage,
    deleteMessage
};