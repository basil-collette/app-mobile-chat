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

    async getDiscussion(wheres) {
        return await this.messageSalonModel.findAll({
            where: wheres,
            order: [['pk_id_salon_message', 'ASC']],
            include: [{
                model: this.userModel,
                as: "userSender",
                attributes: ['idUser', 'prenom', 'nom']
            }, {
                model: this.salonModel,
                as: "salon"
            }]
        });
    }

    async getById(idMessage) {
        //return await this.messageSalonModel.findByPk(idMessage);
        return await this.messageSalonModel.findOne({
            where: { pk_id_salon_message: idMessage },
            raw: true,
            nest: true,
            include: {
                model: this.userModel,
                as: "userSender"
            }
        });
    }

    //INSERT 
    async insert(messageSalonFields) {
        let messageSalon;
        try {
            messageSalon = await this.messageSalonModel.create({
                "content": messageSalonFields.content,
                "created_at": messageSalonFields.createdAt,
                "idUser": messageSalonFields.idUser,
                "idSalon": messageSalonFields.idSalon,
            }, {
                include: {
                    model: this.userModel,
                    as: "userSender"
                }
            });

            return await this.getById(messageSalon.idUserMessageSalon);
            
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting messageSalon');
        }
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idMessage) {
        return await this.messageSalonModel.destroy(
            { where: {pk_id_salon_message: idMessage} }
        );
    }
}