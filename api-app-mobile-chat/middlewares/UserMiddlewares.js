const UserController = new(require('../controllers/UserController'));

/**
 * send a jwttoken tu user, using his credentials
 */
const login = async (req, res, next) => {
    try {
        const userFields = req.body;
        let token = await UserController.login(userFields.username, userFields.password);

        res.header('Authorization', 'Bearer ' + token);
        res.status(200);
        res.send(token);
        next();
        
    } catch (err) {
        res.status(404);
        res.end('user_not_authentified');
        //next(err);
    }
}

/**
 * check if user is authentified using jwt token
 * set the user object returned, in the res.locals
 */
const isAuthorized = async (req, res, next) => {
    const authentifiedUser = await UserController.getAuthorizedUser(req);

    if (!authentifiedUser) {
        res.status(400).send("not_authentified");
        throw new Error();
    }
    
    if(authentifiedUser.id != res.locals.userId && !authorizedUser.roles.includes('ROLE_ADMIN')) {
        res.status(400).send("not_authorized");
        throw new Error();
    }

    res.locals.authentifiedUser = authentifiedUser;
    next();
}

/**
 * check if all inputs required for login are send in body
 */
const loginInputsAreSent = (req, res, next) => {
    const userFields = req.body;

    if (!userFields.username && !userFields.password) {
        res.status(400).send("list of needed inputs is required");
        throw new Error();
    }
        
    for (let i in res.locals.inputsNedded) {
        if (!req.body.includes(i)) {
            res.status(400).send("All inputs are required");
            throw new Error();
        }
    }
    next();
}

/**
 * check if all inputs required for register are send in body
 */
const registerInputsAreSent = (req, res, next) => {
    const userFields = req.body;

    if (userFields.email
        && userFields.prenom
        && userFields.nom
        && userFields.password
        && userFields.confirmPassword
    ) {
        
        for (let i in res.locals.inputsNedded) {
            if (!req.body.includes(i)) {
                res.status(400).send("All inputs are required");
                throw new Error();
            }
        }
        next();
        
    } else {
        res.status(400).send("list of needed inputs is required");
        throw new Error();
    }
}

/**
 * check if the email send in body is allready used by a user
 */
const userDoesntExists = async (req, res, next) => {
    const userFields = req.body;
    if (await UserController.exists(userFields.username)) {
        return res.status(409).send("Error during registration. Please contact support");
    }
    next();
}

/**
 * process before a user persist
 * valorise the fields 'created_at' and 'roles'
 */
const prePersist = (req, res, next) => {
    const date = new Date();
    req.body.createdAt = date;
    if(!req.body.roles) {
        req.body.roles = ["ROLE_USER"];
    }
    next();
}

/**
 * process the insert of the user, with fields sent in body req
 */
const register = async (req, res, next) => {
    const user = await UserController.register(req.body);
        
    if (user) {
        console.log("register : OK");
        res.status(201);
        res.send(user);
        next();
    } else {
        res.status(404);
        res.end();
    }
}

/**
 * send all the users
 */
const getAll = async (req, res, next) => {
    try {
        let users = await UserController.getAll();

        res.status(200);
        res.send(users);
        next();
    } catch (err) {
        next(err);
    }
}

/**
 * send informations of a user
 */
const getOne = async (req, res, next) => {
    try {
        let user = await UserController.getBydId(res.locals.userId);

        res.status(200);
        res.send(user);
        next();
    } catch (err) {
        next(err);
    }
}

/**
 * set the user in process, in the res.locals
 */
const setProcessingUser = (req, res, next) => {
    try {
        res.locals.userId = parseInt(req.params.idUser);
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = {
    loginInputsAreSent,
    userDoesntExists,
    prePersist,
    register,
    registerInputsAreSent,
    isAuthorized,
    login,
    getAll,
    getOne,
    setProcessingUser
};