const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');

//Routes that need to be authentified
router.use('/auth', UserMiddlewares.IsAuthentified, require('../middlewares/AuthentifiedUserMiddlewares'));

router.post("/register", UserMiddlewares.registerInputsAreSent, UserMiddlewares.userDoesntExists, UserMiddlewares.prePersist, UserMiddlewares.register);

router.post("/login", UserMiddlewares.loginInputsAreSent, UserMiddlewares.login);

module.exports = router;