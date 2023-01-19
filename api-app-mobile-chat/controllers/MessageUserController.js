module.exports = class MessageUserController {

    connexion;
    messageUserModel;
    userModel;

    constructor() {
        this.connexion = require('../database/sequelize');

        /*
        this.connexion.authenticate().then(() => {
            console.log('Database Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
        */
       
        this.messageUserModel = require("../models/user_message_user.model")(this.connexion);
        this.userModel = require("../models/user.model")(this.connexion);
    }

    //GET ________________________________________________________________________ GET

    async getDiscussion(wheres) {
        return await this.messageUserModel.findAll({
            where: wheres,
            include: [{
                model: this.userModel,
                as: "userSender",
                attributes: ['idUser', 'prenom', 'nom']
            },{
                model: this.userModel,
                as: "userReceiver",
                attributes: ['idUser', 'prenom', 'nom']
            }]
        });
    }

    async getById(idMessage) {
        return await this.messageUserModel.findOne({
            where: { pk_id_user_message: idMessage },
            raw: true,
            nest: true,
            include: [{
                model: this.userModel,
                as: "userSender"
            },{
                model: this.userModel,
                as: "userReceiver"
            }]
        });
    }

    //INSERT 
    async insert(messageUserFields) {
        let messageUser;
        try {
            messageUser = await this.messageUserModel.create({
                "content": messageUserFields.content,
                "created_at": messageUserFields.createdAt,
                "idUserSender": messageUserFields.idUserSender,
                "idUserReceiver": messageUserFields.idUserReceiver,
            }, {
                include: [{
                    model: this.userModel,
                    as: "userSender"
                },{
                    model: this.userModel,
                    as: "userReceiver"
                }]
            });

            return await this.getById(messageUser.dataValues.idUserMessageUser);
            
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting messageUser');
        }
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idMessage) {
        return await this.messageUserModel.destroy(
            { where: {pk_id_user_message: idMessage} }
        );
    }
}