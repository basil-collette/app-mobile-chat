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