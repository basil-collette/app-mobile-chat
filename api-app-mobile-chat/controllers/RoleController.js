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
        return await this.roleModel.findOne({ where: { pk_id_role: idRole } });
    }

    async getByFilters(filters) {
        return await this.roleModel.findOne({ where: filters });
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

    async updateGroupUsers(groupId, userList) {
        let query =
            `UPDATE user SET 
                groupe_id = case 
                When groupe_id = ${ groupId } AND id NOT IN (${ userList }) then null
                else 1
            end`;
        return await this.groupeModel.query(query, { type: QueryTypes.UPDATE });
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(wheres) {
        return await this.userModel.destroy(
            { where: wheres }
        );
    }
}