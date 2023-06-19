const MessageSalonRepository = require('../repository/MessageSalonRepository');
const SocketHelper = require('../helpers/SocketHelper');

/**
 * get all message from salon
 * GET http://127.0.0.1:3000/messagesalon/getall/:idSalon
 */
const getDiscussion = async (req, res, next) => {
    try {
        const messagesSalon = await MessageSalonRepository.getDiscussion({fk_id_salon: req.params.idSalon});

        res.status(200);
        res.send(messagesSalon);
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error during getting room messages');
    }
}

const getAllMessage = async(req,res,next) => {
    try{
        const getAllMessage = await MessageSalonRepository.getAllMessage();
        res.status(200);
        res.send(getAllMessage);
        next();
    }catch(err){
        console.log(err)
        next(err);
    }
}

/**
 * process before a messageSalon insert
 * valorise the fields 'createdAt'& idUser
 */
const prePersist = async (req, res, next) => {
    try {
        //set createdAt
        req.body.createdAt = new Date();

        //set idUser of the authentified user
        req.body.idUser = res.locals.authentifiedUser.idUser;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error during prepersist room message');
    }
}

/**
 * send a a message to salon
 * POST http://127.0.0.1:3000/messagesalon/send/
 */
const sendMessage = async (req, res, next) => {
    /*
    {
        "content": "test",
        "idSalon": 1
    }
    */
    let messageSalon;

    try {
        messageSalon = await MessageSalonRepository.insert(req.body);
        if (!messageSalon) {
            res.status(500).send('error during sending message to room');
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('error during sending message to room');
        return;
    }
    
    try {
        SocketHelper.emitRoomMsg(req.body.idSalon, messageSalon);
    } catch (err) {
        console.log(err);
        /*
        res.status(500).send('error_during_socket_emit');
        */
    }

    res.status(201);
    res.send(messageSalon);
    next();
}

/**
 * send a a message to salon
 * GET http://127.0.0.1:3000/messagesalon/delete/:idMessage
 */
const deleteMessage = async (req, res, next) => {
    try {
        const idMessageUser = req.params.idMessageUser;
        const result = await MessageSalonRepository.delete(idMessageUser);

        res.status(200);
        res.send(result);
        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).send('error_during_deleting_message');
    }
}

module.exports = {
    getDiscussion,
    prePersist,
    sendMessage,
    deleteMessage,
    getAllMessage
};