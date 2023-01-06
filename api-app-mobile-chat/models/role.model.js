const Sequelize = require("sequelize");

module.exports = (sequelize,) => {
    return sequelize.define("role", {
        idRole: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_role',
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        }
    }, {
        tableName: 'role',
        updatedAt: false
    });
};