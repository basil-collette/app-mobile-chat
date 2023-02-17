const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    
    var filterModel = sequelize.define("filter", {
        idFilter: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_filter',
            allowNull: false,
        },
        insult: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'insult'
        },
        translate: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'translate'
        },
    }, {
        tableName: 'filter',
        createdAt: false,
        updatedAt: false
    });

    return filterModel;
};