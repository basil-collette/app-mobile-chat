const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    var user_possede_roleModel = sequelize.define("user_possede_role", {
        userIdUser: {
            primaryKey: true,
            type: Sequelize.NUMBER,
            field: 'fk_id_user',
            allowNull: false
        },
        roleIdRole: {
            primaryKey: true,
            type: Sequelize.NUMBER,
            field: 'fk_id_role',
            allowNull: false
        }, 
    }, {
        tableName: 'user_possede_role',
        timestamps: false,
        id: false,
        createdAt: false,
        updatedAt: false,
    });

    return user_possede_roleModel;
};