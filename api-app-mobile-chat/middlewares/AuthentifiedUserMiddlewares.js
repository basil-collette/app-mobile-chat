const express = require('express');
const router = express.Router();
const UserController = new(require('../controllers/UserController'));
const RoleController = new(require('../controllers/RoleController'));

// GET ____________________________________________________________________________________________________________________ GET

/**
 * send all the users firstname and lastname
 * http://127.0.0.1:3000/user/auth/:idUser/getall
 */
router.get('/getall', async (req, res, next) => {
    try {
        let users = await UserController.getAll();

        res.status(200);
        res.send(users);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

/**
 * send informations of a user by id
 * http://127.0.0.1:3000/user/auth/:idUser/detail
 */
router.get('/detail', async (req, res, next) => {
    try {
        let user = await UserController.getFilteredById(res.locals.userId);

        res.status(200);
        res.send(JSON.stringify(user));
        next();
    } catch (err) {
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
        let registerFields = req.body;

        //hashage du password
        if (registerFields.password) {
            registerFields.password = await bcrypt.hash(registerFields.password, 10);
        }

        //recupere les roles par leur id
        if (registerFields.roles) {
            const roleController = new RoleController();
            let rolesList = [];
            for(const roleId of registerFields.roles) {
                rolesList.push(await roleController.getById(roleId));
            }
            registerFields.roles = rolesList;
        }

        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

/**
 * update a user by post attributes
 * http://127.0.0.1:3000/user/setProcessUser/:idUser/update
 */
router.post('/update', preUpdate, async (req, res, next) => {
    try {
        let user = await UserController.update(
            req.body,
            { id: res.locals.userId }
        );

        res.status(200);
        res.send(JSON.stringify(user));
        next();

    } catch(err) {
        next(err);
    }
});

module.exports = router;