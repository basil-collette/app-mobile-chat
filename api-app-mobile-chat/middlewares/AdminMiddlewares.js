const UserController = new (require('../controllers/UserController'));
const MessageSalonController = new (require('../controllers/MessageSalonController'));
const MessageUserController = new (require('../controllers/MessageUserController'));
const SalonController = new (require('../controllers/SalonController'));
/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/user/:idUser
 */

const getUsersState = (users) => {
    const socketUserIds = global.clientSockets.map((socketItem) => { return socketItem.idUser; });

    return users.map((user) => {
        let newUser = { ...user.dataValues };

        if (socketUserIds.includes(newUser.idUser)) {
            newUser.isConnected = true;
        } else {
            newUser.isConnected = false;
        }

        return newUser;
    });
}

const deleteUser = async (req, res, next) => {
    try {
        await UserController.delete(parseInt(req.params.idUser));

        res.status(200);
        res.send('user_deleted');
        next();

    } catch (err) {
        next(err);
    }
};

/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/salonmessage/:idMessage
 */
const deleteSalonMessage = async (req, res, next) => {
    try {
        await MessageSalonController.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('message_message_deleted');
        next();

    } catch (err) {
        next(err);
    }
};

/**
 * delete a user by getparams id
 * GET http://127.0.0.1:3000/admin/delete/usermessage/:idMessage
 */
const deleteUserMessage = async (req, res, next) => {
    try {
        await MessageUserController.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('user_message_deleted');
        next();

    } catch (err) {
        next(err);
    }
};

const createSalon = async (req, res, next) => {
    try {
        let salon = await SalonController.create(req.body)
        res.status(200);
        res.send('salon_created');
        next();
    } catch (err) {
        next(err)
        res.end();
    }
}

const getAllUser = async (req, res, next) => {
    try {
        let users = getUsersState(await UserController.getAllAdmin(parseInt(req.params.idMessage)));
        res.status(200);
        res.send(users);
    } catch (err) {
        next(err)
        res.end();
    }
}

const updateSalon = async (req, res, next) => {
    try {
        let salon = await SalonController.update(req.body, {idSalon : parseInt(req.params.idSalon)});

        if (!salon) {
            throw new Error();
        }
        res.status(200);
        res.send(salon);

    } catch (err) {
        next(err)
        res.end();
    }
}

module.exports = {
    deleteUser,
    deleteSalonMessage,
    deleteUserMessage,
    createSalon,
    getAllUser,
    updateSalon
};