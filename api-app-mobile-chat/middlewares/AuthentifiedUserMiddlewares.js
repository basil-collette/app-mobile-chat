const UserRepository = require('../repository/UserRepository');
const {getUsersState, isAuthorized} = require('./UserMiddlewares');
const router = require('express').Router();

/**
 * send all the users firstname and lastname
 * GET http://127.0.0.1:3000/user/auth/getall
 */
router.get('/getall', async (req, res, next) => {
    try {
        let users = getUsersState(await UserRepository.getAll());
        
        res.status(200);
        res.send(users);
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('error during getting allUsers');
    }
});

//Routes that need authorization (Authentified && concerned || Admin)
router.use('/:idUser', isAuthorized, require('../middlewares/AuthorizedUserMiddlewares'));

module.exports = router;