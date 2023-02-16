const express = require('express');
const router = express.Router();
const UserMiddlewares = require('../middlewares/UserMiddlewares');
const SalonMiddleWares = require('../middlewares/SalonMiddlewares');

//Routes that need authorization (Authentified and concerned or Admin)

router.use('/getall', UserMiddlewares.IsAuthentified, SalonMiddleWares.getAll);



module.exports = router;