module.exports = class RoleController {

    connexion;
    roleModel;

    constructor() {
        this.connexion = require('../database/sequelize');

        /*
        this.connexion.authenticate().then(() => {
            console.log('Database Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
        */
       
        this.roleModel = require("../models/role.model")(this.connexion);
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

    //UPDATE __________________________________________________________________ UPDATE

    async update(attributes, wheres) {
        if (attributes.password) {
            attributes.password = await bcrypt.hash(attributes.password, 10);
        }

        return await this.userModel.update(
            attributes,
            {
                where: wheres
            }
        );
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(wheres) {
        return await this.userModel.destroy(
            { where: wheres }
        );
    }
}