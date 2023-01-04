const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    const roleModel = require("./role.model")(sequelize);

    var userModel = sequelize.define("user", {
        idUser: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_user',
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        },
    }, {
        tableName: 'user'
    });

    
    userModel.associate = function() {
        userModel.belongsToMany(roleModel, {
            through: 'user_possede_role',
            as: 'roles',
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        })
    }

    return userModel;
};