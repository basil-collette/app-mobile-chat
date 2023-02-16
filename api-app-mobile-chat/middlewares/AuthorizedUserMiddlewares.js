const router = require('express').Router();
const {userDoesntExists, getUsersState} = require('./UserMiddlewares');
const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');

// GET ____________________________________________________________________________________________________________________ GET

/**
 * send informations of a user by id
 * GET http://127.0.0.1:3000/user/auth/:idUser/detail
 */
router.get('/detail', async (req, res, next) => {
    try {
        let user;
        if (await UserRepository.isAdmin(res.locals.authentifiedUser)) {
            user = await UserRepository.getNestedFilteredByFilters({pk_id_user: res.locals.userId});
        } else {
            user = await UserRepository.getFilteredById(res.locals.userId);
        }

        user = getUsersState([user])[0];
        
        res.status(200);
        res.send(user);
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('error during getting user detail');
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
        res.status(500).send('error during preupdate user');
    }
}

/**
 * update a user by post attributes
 * POST http://127.0.0.1:3000/user/auth/:idUser/update
 */
router.put('/update', userDoesntExists, preUpdate, async (req, res, next) => {
    try {
        let user = await UserRepository.update(
            req.body,
            { idUser: res.locals.userId }
        );
        user.dataValues.idUser = res.locals.userId;
        user.roles = await user.getRoles();        

        res.status(201);
        res.send(user);
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error during update user');
    }
});

module.exports = router;