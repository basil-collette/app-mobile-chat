'use strict';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const RoleController = require('./RoleRepository');

let instance = null;

class UserRepository {
    
    connexion;
    userModel;
    roleModel;

    constructor() {
        if (!instance) {
            this.connexion = require('../database/sequelize');
        
            this.userModel = require("../models/user.model")(this.connexion);
            this.roleModel = require("../models/role.model")(this.connexion);

            instance = this;
        }
    
        return instance;
    }

    //Account ________________________________________________________________________ Account

    async register(userFields) {
        /*
        {
            "email": "basil.collette@outlook.fr",
            "prenom": "basil",
            "nom": "collette",
            "password": "password",
            "confirmPassword": "password",
            "roles": [1]
        }
        */

        let user;
        try {
            user = await this.userModel.create({
                "email": userFields.email,
                "prenom": userFields.prenom,
                "nom": userFields.nom,
                "password": userFields.password,
                "created_at": userFields.created_at,
            }, {
                include: {
                    model: this.roleModel,
                    as: "roles"
                }
            });
            
        } catch (err) {
            console.error(err);
            throw new Error('error during inserting user');
        }
        
        try {
            if (!userFields.roles) {
                const roleUser = RoleController.getOneByFilters({code: 'user'});
                user.addRole(roleUser);
            } else {
                for(const idRole of userFields.roles) {
                    if (await RoleController.getById(idRole) != null) {
                        user.addRole(idRole);
                    }
                }
            }
        } catch (err) {
            console.error(err);
            throw new Error('error during adding role to user');
        }

        return user;
    }

    async isAdmin(user) {
        if (!user) {
            throw new Error('isAdmin : user is undefined');
        }
        
        if (!user.roles) {
            user.roles = await user.getRoles();
        }
        
        return user.roles.find(role => role.code == 'admin') != undefined;
    }

    async getAuthentifiedUser(req) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_KEY);

            const userCredentials = jwt.decode(token, process.env.TOKEN_KEY);
            
            let user = await this.getById(userCredentials.idUser);
            user.roles = await user.getRoles();
            
            return user;
            
        } catch (err) {
            console.error(err);
            throw new Error('error_during_processing_jwttoken');
        }
    }

    //GET ________________________________________________________________________ GET

    async getAll() {
        this.roleModel = require("../models/role.model")(this.connexion);

        return await this.userModel.findAll({
            //include: {model: this.roleModel, as: 'roles', attributes: ['libelle']},
            attributes: ['idUser', 'prenom', 'nom']
        });
    }

    async getById(idUser) {
        return await this.userModel.findByPk(idUser);
    }

    async getFilteredById(idUser) {
        return await this.getFilteredByFilters({pk_id_user: idUser});
    }

    async getByFilters(filters) {
        return await this.userModel.findOne({where: filters });
    }

    async getFilteredByFilters(filters) {
        return await this.userModel.findOne({
            attributes: ['idUser', 'prenom', 'nom'],
            where: filters
        });
    }

    async getNestedFilteredByFilters(filters) {
        return await this.userModel.findOne({
            attributes: ['idUser', 'prenom', 'nom', 'email', 'created_at'],
            where: filters,
            include: {
                attributes: ['code'],
                model: this.roleModel,
                as: "roles"
            }
        });
    }

    //UPDATE __________________________________________________________________ UPDATE

    async update(attributes, wheres) {
        //set attributes
        await this.userModel.update(
            attributes,
            {
                where: wheres
            }
        );

        let user = await this.getByFilters(
            wheres,
            {
                include: {
                    model: this.roleModel,
                    as: "roles"
            }
        });
        
        if (attributes.roles) {
            try {
                await user.setRoles(attributes.roles);
                user.roles = user.getRoles();

            } catch(err) {
                console.error(err);
                throw new Error('error during updating user roles');
            }
        }

        return await this.getNestedFilteredByFilters(wheres);
    }

    //DELETE __________________________________________________________________ DELETE

    async delete(idUser) {
        return await this.userModel.destroy(
            { where: {pk_id_user: idUser }}
        );
    }

    //OTHER ___________________________________________________________________ OTHER

    async exists(userEmail) {
        const user = await this.getByFilters({ email: userEmail });
        //return user != null;
        return user;
    }
    
}

module.exports = new UserRepository();