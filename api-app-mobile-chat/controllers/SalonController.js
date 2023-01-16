module.exports = class SalonController {

    connexion;
    salonModel;

    constructor() {
        this.connexion = require('../database/sequelize');

        /*
        this.connexion.authenticate().then(() => {
            console.log('Database Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
        */

        this.salonModel = require("../models/salon.model")(this.connexion);
    }

    //GET ________________________________________________________________________ GET

    async getAll() {
        return await this.messageSalon.findAll();
    }

    async getById(idMessage) {
        return await this.messageSalon.findByPk(idMessage);
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idSalon) {
        return await this.messageSalon.destroy(
            { where: {pk_id_salon: idSalon} }
        );
    }
}