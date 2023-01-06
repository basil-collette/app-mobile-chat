const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = class UserPossedeRoleController {

    user_possede_roleModel;

    constructor() {
        this.connexion = require('../database/sequelize');

        /*
        this.connexion.authenticate().then(() => {
            console.log('Database Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
        */

        this.user_possede_roleModel = require("../models/user_possede_role.model")(this.connexion);
    }

    //GET ________________________________________________________________________ GET

    async getByFilters(filters) {
        return await this.user_possede_roleModel.findOne({ where: filters });
    }

}