const express = require('express');
const router = express.Router();
const UserMiddlewares = require('./UserMiddlewares');
const UserController = new(require('../controllers/UserController'));
const bcrypt = require('bcrypt');

// GET ____________________________________________________________________________________________________________________ GET

const getUsersState = (users) => {
    const socketUserIds = global.clientSockets.map((socketItem) => {return socketItem.idUser;});
    
    return users.map((user) => {
        let newUser = {...user.dataValues};

        if (socketUserIds.includes(newUser.idUser)) {
            newUser.isConnected = true;
        } else {
            newUser.isConnected = false;
        }
        
        return newUser;
    });
}

/**
 * send all the users firstname and lastname
 * GET http://127.0.0.1:3000/user/auth/:idUser/getall
 */
router.get('/getall', async (req, res, next) => {
    try {
        let users = getUsersState(await UserController.getAll());
        
        res.status(200);
        res.send(users);
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * send informations of a user by id
 * GET http://127.0.0.1:3000/user/auth/:idUser/detail
 */
router.get('/detail', async (req, res, next) => {
    try {
        let user;
        if (await UserController.isAdmin(res.locals.authentifiedUser)) {
            user = await UserController.getNestedFilteredByFilters({pk_id_user: res.locals.userId});
        } else {
            user = await UserController.getFilteredById(res.locals.userId);
        }

        user = getUsersState([user])[0];
        
        res.status(200);
        res.send(user);
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// UPDATE ______________________________________________________________________________________________________________ UPDATE

/**
 * process before a user update
 * valorise the fields 'password' and 'roles'
 */
const preUpdate = async (req, res, next) => {
    try {
        //hashage du password
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/**
 * update a user by post attributes
 * POST http://127.0.0.1:3000/user/auth/:idUser/update
 */
router.put('/update', UserMiddlewares.userDoesntExists, preUpdate, async (req, res, next) => {
    try {
        let user = await UserController.update(
            req.body,
            { idUser: res.locals.userId }
        );
        user.dataValues.idUser = res.locals.userId;
        user.roles = await user.getRoles();        

        res.status(201);
        res.send(user);
        next();

    } catch(err) {
        next(err);
    }
});

module.exports = router;