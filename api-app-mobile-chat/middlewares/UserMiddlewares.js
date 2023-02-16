const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * process the insert of the user, with fields sent in body req
 */
const register = async (req, res, next) => {
    try {
        const user = await UserRepository.register(req.body);
        
        if (user) {
            res.status(201);
            res.send(user);
            next();
        } else {
            res.status(406).send('error_during_registration');
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('error_during_registration');
    }
}

/**
 * 
 */
const getJwtToken = (user) => {
    const ONE_DAY = 24 * 60 * 60; //hour * minutes * seconds
    
    return jwt.sign(
        {
            idUser: user.idUser,
            roles: user.roles,
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: ONE_DAY
        }
    );
}

/**
 * send a jwttoken tu user, using his credentials
 */
const login = async (req, res, next) => {
    try {
        const userFields = req.body;
        
        let userResult = await UserRepository.getByFilters({
            email: userFields.email
        }, {
            include: {
                model: this.roleModel,
                as: "roles"
            }
        });
    
        if (!userResult) {
            res.status(401).send('authentification_failed');
            return;
        }
    
        const match = await bcrypt.compare(userFields.password, userResult.password);
        if (!match) {
            res.status(401).send('authentification_failed');
            return;
        }

        delete userResult.dataValues.password;

        userResult.dataValues.roles = await userResult.getRoles({attributes: ['idRole', 'code']});
        
        const tokenResult = getJwtToken(userResult);

        const finalResponse = {user: userResult, token: tokenResult};

        res.status(200);
        res.send(finalResponse);
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send('error_during_authentification');
    }
}

/**
 * check if user authentified is admin
 */
const isAdmin = async (req, res, next) => {
    try {
        if(!res.locals.authentifiedUser) {
            res.locals.authentifiedUser = await UserRepository.getAuthentifiedUser(req);
        }

        if (!UserRepository.isAdmin(res.locals.authentifiedUser)) {
            res.status(406).send('not_autorized');
            return;
        }
        next();
    } catch(err) {
        console.log(err);
        res.status(500).send('error_during_adminrole_check');
    }
}

/**
 * check if user is authentified using jwt token
 * set the user object returned, in the res.locals
 */
const IsAuthentified = async (req, res, next) => {
    try {
        const authentifiedUser = await UserRepository.getAuthentifiedUser(req);

        if (!authentifiedUser) {
            res.status(401).send('not_authentified');
            return;
        }
    
        res.locals.authentifiedUser = authentifiedUser;
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error_during_authentification_check');
    }
}

/**
 * check if user is authentified using jwt token
 * set the user object returned, in the res.locals
 */
const isAuthorized = async (req, res, next) => {
    try {
        if (!req.params.idUser) {
            res.status(406).send('idUser GET params is missing');
            return;
        }
        res.locals.userId = parseInt(req.params.idUser);

        if (res.locals.authentifiedUser.idUser != res.locals.userId
            && !UserRepository.isAdmin(res.locals.authentifiedUser)
        ) {
            res.status(406).send('not_authorized');
            return;
        }
        next();

    } catch(err) {
        console.log(err);
        res.status(500).send('error_during_authorization_check');
    }
}

/**
 * check if all inputs required for login are send in body
 */
const loginInputsAreSent = (req, res, next) => {
    const userFields = req.body;

    if (!userFields.email || !userFields.password) {
        res.status(406).send('list of needed inputs is required');
        return;
    }
    next();
}

/**
 * check if all inputs required for register are send in body
 */
const registerInputsAreSent = (req, res, next) => {
    const userFields = req.body;

    if (
        !userFields.email
        || !userFields.prenom
        || !userFields.nom
        || !userFields.password
    ) {
        res.status(406).send('list of needed inputs is required');
        return;
    }

    next();
}

/**
 * check if the email send in body is already used by a user
 */
const userDoesntExists = async (req, res, next) => {
    const userAllreadyExists = await UserRepository.exists(req.body.email);
    if (!res.locals.userId) {

        if (userAllreadyExists) {
            res.status(406).send('Error during registration. This email is already used');
            return
        }
        
    } else {
        if (
            req.body.email
            && userAllreadyExists != null
            && userAllreadyExists.idUser != res.locals.userId
        ) {
            res.status(406).send('Update Failed, this email is already used');
            return;
        }
    }
    
    next();
}

/**
 * process before a user persist
 * valorise the fields 'created_at' and 'roles', hash password
 */
const prePersist = async (req, res, next) => {
    try {
        //valorisation de la date de creation
        req.body.createdAt = new Date();

        //hashage du password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        //valorisation du roles si aucun n'est spécifié
        if (!req.body.roles) {
            req.body.roles = [1];
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error_during_prePersist_user');
    }
}

/**
 * 
 */
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

module.exports = {
    loginInputsAreSent,
    userDoesntExists,
    prePersist,
    register,
    registerInputsAreSent,
    isAdmin,
    IsAuthentified,
    login,
    getJwtToken,
    getUsersState,
    isAuthorized
};