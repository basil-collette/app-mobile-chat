const SalonRepository = require('../repository/SalonRepository');

const getAll = async (req, res, next) => {
    try {
        let result = await SalonRepository.getAll();

        res.status(200);
        res.send(result);
        next();
        
    } catch (err) {
        console.log(err);
        res.status(404).send('error_during_getAll');
    }
}

module.exports = {
    getAll,
};