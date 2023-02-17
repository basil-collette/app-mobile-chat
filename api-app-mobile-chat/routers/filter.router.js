const express = require('express');
const router = express.Router();
const FilterMiddlewares = require('../middlewares/FilterMiddlewares');

router.get('/getAll', FilterMiddlewares.getAllTranslate);

module.exports = router;