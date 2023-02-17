const FilterRepository = require('../repository/FilterRepository');
/**
 * retourne tous les translations
 * GET http://127.0.0.1:3000/translate/getAll
 */
const getAllTranslate = async (req, res, next) => {
    try {
        const filters = await FilterRepository.getAll();
        res.status(200);
        res.send(filters);

    } catch (err) {
        console.log(err);
        res.status(500).send('error_getting_all_translate');
    }
}

module.exports = {
    getAllTranslate
};