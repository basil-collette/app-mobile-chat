'use strict';
/**
 * Singleton de repository gérant les salons.
 */

let instance = null;

class FilterRepository {
    
    connexion;
    filterModel;

    constructor() {
        if (!instance) {
            this.connexion = require('../database/sequelize');

            this.filterModel = require("../models/filter.model")(this.connexion);

            instance = this;
        }
    
        return instance;
    }

    //GET ________________________________________________________________________ GET

    async getAll() {
        return await this.filterModel.findAll();
    }

}

module.exports = new FilterRepository();
