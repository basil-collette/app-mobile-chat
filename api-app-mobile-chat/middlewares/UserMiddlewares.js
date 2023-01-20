const UserController = new(require('../controllers/UserController'));
const bcrypt = require('bcrypt');

/**
 * send a jwttoken tu user, using his credentials
 */
const login = async (req, res, next) => {
    try {
        const userFields = req.body;
        
        let result = await UserController.login(userFields.email, userFields.password);

        res.status(200);
        res.send(result);
        next();
    } catch (err) {
        console.log(err);
        res.status(404);
        res.end('error_during_authentification');
        //next(err);
    }
}

/**
 * check if user authentified is admin
 */
const isAdmin = async (req, res, next) => {
    try {
        if(!res.locals.authentifiedUser) {
            res.locals.authentifiedUser = await UserController.getAuthentifiedUser(req);
        }

        if (!UserController.isAdmin(res.locals.authentifiedUser)) {
            throw new Error('not_autorized');
        }
        next();
    } catch(err) {
        console.log(err);
        next(err);
    }
}

/**
 * check if user is authentified using jwt token
 * set the user object returned, in the res.locals
 */
const isAuthorized = async (req, res, next) => {
    try {
        if (!req.params.idUser) {
            throw new Error('userId GET params is missing');
        }
        res.locals.userId = parseInt(req.params.idUser);

        if (res.locals.authentifiedUser.idUser != res.locals.userId
            && !UserController.isAdmin(res.locals.authentifiedUser)
        ) {
            res.status(400).send('not_authorized');
            throw new Error('not_authorized');
        }
        next();

    } catch(err) {
        console.log(err);
        next(err);
    }
}

/**
 * check if user is authentified using jwt token
 * set the user object returned, in the res.locals
 */
const IsAuthentified = async (req, res, next) => {
    try {
        const authentifiedUser = await UserController.getAuthentifiedUser(req);

        if (!authentifiedUser) {
            res.status(400).send('not_authentified');
            throw new Error('not_authentified');
        }
    
        res.locals.authentifiedUser = authentifiedUser;
        next();

    } catch(err) {
        console.log(err);
        next(err);
    }
}

/**
 * check if all inputs required for login are send in body
 */
const loginInputsAreSent = (req, res, next) => {
    throw new Error('test');
    const userFields = req.body;

    if (!userFields.email || !userFields.password) {
        res.status(400).send("list of needed inputs is required");
        throw new Error();
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
        || !userFields.confirmPassword
    ) {
        res.status(400).send("list of needed inputs is required");
        throw new Error();
    }

    if (userFields.password != userFields.confirmPassword) {
        throw new Error('confirmPassword different than password');
    }

    next();
}

/**
 * check if the email send in body is already used by a user
 */
const userDoesntExists = async (req, res, next) => {
    if (await UserController.exists(req.body.email)) {
        throw new Error("Error during registration. Please contact support");
        //return res.status(409).send("Error during registration. Please contact support");
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
        next(err);
    }
}

/**
 * process the insert of the user, with fields sent in body req
 */
const register = async (req, res, next) => {
    try {
        const user = await UserController.register(req.body);
        
        if (user) {
            res.status(201);
            res.send(user);
            next();
        } else {
            res.status(404);
            res.end();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    loginInputsAreSent,
    userDoesntExists,
    prePersist,
    register,
    registerInputsAreSent,
    isAdmin,
    isAuthorized,
    IsAuthentified,
    login
};