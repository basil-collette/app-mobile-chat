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
        return await this.salonModel.findAll();
    }

    async getById(idMessage) {
        return await this.salonModel.findByPk(idMessage);
    }

    async create(salonFields) {
        try {
            let salon;
            salon = await this.salonModel.create({
                "libelle": salonFields.libelle,
                "created_at": new Date(),
            })
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting user');
        }
    }
    //DELETE __________________________________________________________________ DELETE

    async delete(idSalon) {
        return await this.salonModel.destroy(
            { where: { pk_id_salon: idSalon } }
        );
    }

    async update(attributes, wheres) {
        return await this.salonModel.update(
            attributes,
            {
                where: wheres
            }
        );
    }
 
}

module.exports = new SalonRepository();
