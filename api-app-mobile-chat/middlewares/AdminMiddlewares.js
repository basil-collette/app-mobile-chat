const UserRepository = require('../repository/UserRepository');
const MessageSalonRepository = require('../repository/MessageSalonRepository');
const MessageUserRepository = require('../repository/MessageUserRepository');

/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/user/:idUser
 */
const deleteUser = async (req, res, next) => {
    try {
        await UserRepository.delete(parseInt(req.params.idUser));

        res.status(200);
        res.send('user_deleted');
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during deleting user');
    }
};

/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/salonmessage/:idMessage
 */
const deleteSalonMessage = async (req, res, next) => {
    try {
        await MessageSalonRepository.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('message_message_deleted');
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during deleting room');
    }
};

/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/usermessage/:idMessage
 */
const deleteUserMessage = async (req, res, next) => {
    try {
        await MessageUserRepository.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('user_message_deleted');
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during deleting private message');
    }
};

module.exports = {
    deleteUser,
    deleteSalonMessage,
    deleteUserMessage
};