const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    
    var salonModel = sequelize.define("salon", {
        idSalon: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_salon',
            allowNull: false,
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        },
    }, {
        tableName: 'salon',
        updatedAt : false
    });

    return salonModel;
};