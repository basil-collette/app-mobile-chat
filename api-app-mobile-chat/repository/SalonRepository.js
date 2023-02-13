'use strict';
/**
 * Singleton de repository gérant les salons.
 */

let instance = null;

class SalonRepository {
    
    connexion;
    salonModel;

    constructor() {
        if (!instance) {
            this.connexion = require('../database/sequelize');

            this.salonModel = require("../models/salon.model")(this.connexion);

            instance = this;
        }
    
        return instance;
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

module.exports = new SalonRepository();