const UserRepository = require('../repository/UserRepository');
const MessageSalonRepository = require('../repository/MessageSalonRepository');
const MessageUserRepository = require('../repository/MessageUserRepository');
const SalonRepository = require('../repository/SalonRepository');
const {getUsersState} = require('./UserMiddlewares');

//USER _________________________________________________________________________________________________________________ USER

/**
 * retourne tout les users nested
 * GET http://127.0.0.1:3000/admin/getall/user
 */
const getAllUser = async (req, res, next) => {
    try {
        let users = getUsersState(await UserRepository.getAll(parseInt(req.params.idMessage)));
        res.status(200);
        res.send(users);
        
    } catch (err) {
        console.log(err);
        res.status(500).send('error_getting_all_users');
    }
}

/**
 * delete un user
 * DELETE http://127.0.0.1:3000/admin/delete/user/:idUser
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

//SALON MESSAGE _________________________________________________________________________________________________________________ SALON MESSAGE

/**
 * retourne tout les SalonMessages
 * GET http://127.0.0.1:3000/admin/getall/salonmessage'
 */
const getAllRoomMessages = async (req, res, next) => {
    try {
        const roomMessages = await MessageSalonRepository.getAll();
        
        res.status(200);
        res.send(roomMessages);
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send('error during getting all room messages');
    }
}

/**
 * delete a room message
 * DELETE http://127.0.0.1:3000/admin/delete/salonmessage/:idMessage
 */
const deleteRoomMessage = async (req, res, next) => {
    try {
        const result = await MessageSalonRepository.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('message_message_deleted');
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during deleting room');
    }
};

//USER MESSAGE _________________________________________________________________________________________________________________ USER MESSAGE

/**
 * retourne tout les UserMessages
 * GET http://127.0.0.1:3000/admin/getall/usermessage'
 */
const getAllUserMessages = async (req, res, next) => {
    try {
        const privateMessages = await MessageUserRepository.getAll();
        
        res.status(200);
        res.send(privateMessages);
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send('error during getting all private messages');
    }
}

/**
 * delete a user by getparams id
 * DELETE http://127.0.0.1:3000/admin/delete/usermessage/:idMessage
 */
const deleteUserMessage = async (req, res, next) => {
    try {
        const result = await MessageUserRepository.delete(parseInt(req.params.idMessage));

        res.status(200);
        res.send('user_message_deleted');
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during deleting private message');
    }
};

//SALON _______________________________________________________________________________________________________________________ SALON

/**
 * create a room
 * POST http://127.0.0.1:3000/admin/create/salon
 */
const createSalon = async (req, res, next) => {
    try {
        let salon = await SalonRepository.create(req.body)

        res.status(201);
        res.send('salon_created');
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error during creating salon');
    }
}

/**
 * update un salon
 * PUT http://127.0.0.1:3000/admin/update/salon/:idSalon
 */
const updateSalon = async (req, res, next) => {
    try {
        let salon = await SalonRepository.update(req.body, {idSalon : parseInt(req.params.idSalon)});

        if (!salon) {
            res.status(406).send('error during updating private message');
            return;
        }

        res.status(200);
        res.send(salon);

    } catch (err) {
        console.log(err);
        res.status(500).send('error during updating salon');
    }
}

/**
 * delete a room
 * DELETE http://127.0.0.1:3000/admin/delete/salon/:idSalon
 */
const deleteSalon = async (req, res, next) => {
    try {
        const idSalon = req.params.idSalon;
        let result = await SalonRepository.delete(idSalon);

        res.status(200);
        res.send("room_delete");
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send('error_during_delete_room');
    }
}

//MODULE EXPORT ___________________________________________________________________________________________________________ MODULE EXPORT

module.exports = {
    deleteUser,
    deleteRoomMessage,
    deleteUserMessage,
    createSalon,
    getAllUser,
    updateSalon,
    getAllUserMessages,
    deleteSalon,
    getAllRoomMessages
};