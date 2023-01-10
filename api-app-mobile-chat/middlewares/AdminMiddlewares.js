const UserController = new(require('../controllers/UserController'));
const MessageSalonController = new(require('../controllers/MessageSalonController'));
const MessageUserController = new(require('../controllers/MessageUserController'));

/**
 * delete a user by getparams id
 * http://127.0.0.1:3000/admin/delete/user/:idUser
 */
const deleteUser = async (req, res, next) => {
    try {
        await UserController.delete(parseInt(req.params.idUser));

        res.status(200);
        res.send('user_deleted');
        next();

    } catch(err) {
        next(err);
    }
};

/**
 * delete a user by getparams id
 * http://127.0.0.1:3000/admin/delete/salonmessage/:idMessage
 */
const deleteSalonMessage = async (req, res, next) => {
    try {
        await MessageSalonController.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('message_message_deleted');
        next();

    } catch(err) {
        next(err);
    }
};

/**
 * delete a user by getparams id
 * http://127.0.0.1:3000/admin/delete/usermessage/:idMessage
 */
const deleteUserMessage = async (req, res, next) => {
    try {
        await MessageUserController.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('user_message_deleted');
        next();

    } catch(err) {
        next(err);
    }
};

module.exports = {
    deleteUser,
    deleteSalonMessage,
    deleteUserMessage
};