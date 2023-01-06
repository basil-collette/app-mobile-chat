const express = require('express');
const router = express.Router();
const UserController = new(require('../controllers/UserController'));
const RoleController = new(require('../controllers/RoleController'));

/**
 * send all the users firstname and lastname
 * http://127.0.0.1:3000/user/setProcessUser/:idUser/getall
 */
router.post('/getall', async (req, res, next) => {
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
 * http://127.0.0.1:3000/user/setProcessUser/:idUser/getbyid
 */
router.post('/getbyid', async (req, res, next) => {
    try {
        let user = await UserController.getBydId(res.locals.userId);

        res.status(200);
        res.send(JSON.stringify(user));
        next();
    } catch (err) {
        next(err);
    }
});

/**
 * send informations of a user by email
 * http://127.0.0.1:3000/user/setProcessUser/:idUser/getbyemail/:email
 */
router.post('/getbyemail/:email', async (req, res, next) => {
    try {
        let user = await UserController.getByFilters({email: req.params.email});

        res.status(200);
        res.send(JSON.stringify(user));
        next();
        
    } catch (err) {
        next(err);
    }
});

/**
 * update a user by post attributes
 * http://127.0.0.1:3000/user/setProcessUser/:idUser/update
 */
router.post('/update', this.preUpdate, async (req, res, next) => {
    try {
        let user = await UserController.update(
            req.body,
            { id: res.locals.userId }
        );

        res.status(200);
        res.send(user);
        next();

    } catch(err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        await UserController.delete({ id: parseInt(res.locals.userId) });

        res.status(200);
        res.send('user_deleted');
        next();

    } catch(err) {
        next(err);
    }
});

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

module.exports = router;