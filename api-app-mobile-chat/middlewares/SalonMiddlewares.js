const SalonController = new(require('../controllers/SalonController'));

/**
 * send a jwttoken tu user, using his credentials
 */
const getAll = async (req, res, next) => {
    try {
        let result = await SalonController.getAll();

        res.status(200);
        res.send(result);
        next();
    } catch (err) {
        console.log(err);
        res.status(404).send('error_during_getAll');
    }
}

const deleteSalon = async (req, res, next) => {
    try {
        const idSalon = req.params.idSalon;
        let result = await SalonController.delete(idSalon);
        res.status(200);
        res.send("user_delete");
        next();
    } catch (err) {
        console.log(err);
        res.status(404).send('error_during_delete');
    }
}

module.exports = {
    getAll,
    deleteSalon
};