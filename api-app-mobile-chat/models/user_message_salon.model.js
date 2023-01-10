const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    const salonModel = require("./salon.model")(sequelize);
    const userModel = require("./user.model")(sequelize);

    var user_message_salonModel = sequelize.define("user_message_salon", {
        idUserMessageSalon: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_salon_message',
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fk_id_user'
        },
        idSalon: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fk_id_salon'
        }
    }, {
        tableName: 'user_message_salon',
        updatedAt: false
    });

    user_message_salonModel.belongsTo(userModel, {
        foreignKey: {
            name : 'idUser',
            field: 'fk_id_user'
          },
          as: 'user'
    });

    user_message_salonModel.belongsTo(salonModel, {
        foreignKey: {
            name:'idSalon',
            field: 'fk_id_salon'
          },
          as: 'salon'
    });

    return user_message_salonModel;
};