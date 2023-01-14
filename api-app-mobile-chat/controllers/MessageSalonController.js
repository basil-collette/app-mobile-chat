module.exports = class MessageSalonController {

    connexion;
    messageSalonModel;
    userModel;
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
       
        this.messageSalonModel = require("../models/user_message_salon.model")(this.connexion);
        this.userModel = require("../models/user.model")(this.connexion);
        this.salonModel = require("../models/salon.model")(this.connexion);
    }

    //GET ________________________________________________________________________ GET

    async getAll() {
        return await this.messageSalonModel.findAll({
            include: {
                model: this.userModel,
                as: "user",
                attributes: ['prenom', 'nom']
            }
        });
    }

    async getById(idMessage) {
        return await this.messageSalonModel.findByPk(idMessage);
    }

    //INSERT 
    async insert(messageSalonFields) {
        /*
        {
            "content": "test",
            "idSalon": 1
        }
        */
        let messageSalon;
        try {
            messageSalon = await this.messageSalonModel.create({
                "content": messageSalonFields.content,
                "created_at": messageSalonFields.createdAt,
                "idUser": messageSalonFields.idUser,
                "idSalon": messageSalonFields.idSalon,
            }, {
                include: [{
                    model: this.userModel,
                    as: "user"
                }, {
                    model: this.salonModel,
                    as: "salon"
                }]
            });
            
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting messageSalon');
        }

        return messageSalon;
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idMessage) {
        return await this.messageSalonModel.destroy(
            { where: {pk_id_salon_message: idMessage} }
        );
    }
}