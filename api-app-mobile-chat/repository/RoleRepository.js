'use strict';
/**
 * Singleton de repository gérant les messages privés.
 */

let instance = null;

class RoleRepository {
    
    connexion;
    roleModel;

    constructor() {
        if (!instance) {
            this.connexion = require('../database/sequelize');
        
            this.roleModel = require("../models/role.model")(this.connexion);

            instance = this;
        }
    
        return instance;
    }

    //GET ________________________________________________________________________ GET

    async getAll() {
        return await this.roleModel.findAll({
            //attributes: ['prenom', 'nom']
        });
    }

    async getById(idRole) {
        return await this.roleModel.findByPk(idRole);
    }

    async getOneByFilters(filters) {
        return await this.roleModel.findOne({ where: filters });
    }

    async getAllByFilters(filters) {
        return await this.roleModel.findAll({ where: filters });
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(wheres) {
        return await this.userModel.destroy(
            { where: wheres }
        );
    }
    
}

module.exports = new RoleRepository();