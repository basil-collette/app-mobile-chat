'use strict';
/**
 * Singleton de repository gérant les messages privés.
 */

let instance = null;

class MessageUserRepository {
    
    connexion;
    messageUserModel;
    userModel;

    constructor() {
        if (!instance) {
            this.connexion = require('../database/sequelize');
        
            this.messageUserModel = require("../models/user_message_user.model")(this.connexion);
            this.userModel = require("../models/user.model")(this.connexion);

            instance = this;
        }
    
        return instance;
    }

    //GET ________________________________________________________________________ GET

    async getDiscussion(wheres) {
        return await this.messageUserModel.findAll({
            where: wheres,
            raw: true,
            nest: true,
            order: [['pk_id_user_message', 'ASC']],
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

    async getAllMessage() {
        return await this.messageUserModel.findAll({
            raw: true,
            nest: true,
            order: [['pk_id_user_message', 'ASC']]
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

    //INSERT __________________________________________________________________ INSERT

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
                }, {
                    model: this.userModel,
                    as: "userReceiver"
                }]
            });

            return await this.getById(messageUser.idUserMessageUser);
            
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

module.exports = new MessageUserRepository();