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

    async getAll() {
        return await this.messageUserModel.findAll(
            /*{
            include: [{
                model: this.userModel,
                as: "userSender",
                attributes: ['prenom', 'nom']
            }, {
                model: this.userModel,
                as: "userReceiver",
                attributes: ['prenom', 'nom']
            }]
        }*/
        );
    }

    async getById(idMessage) {
        return await this.messageUserModel.findByPk(idMessage);
    }

    //INSERT 
    async insert(messageUserFields) {
        /*
        {
            "content": "test",
            "idSalon": 1
        }
        */
        console.log(messageUserFields);
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
            
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting messageUser');
        }

        return messageUser;
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idMessage) {
        return await this.messageUserModel.destroy(
            { where: {pk_id_user_message: idMessage} }
        );
    }
}