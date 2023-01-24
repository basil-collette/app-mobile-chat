const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    const userModel = require("./user.model")(sequelize);

    var user_message_userModel = sequelize.define("user_message_user", {
        idUserMessageUser: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.NUMBER,
            field: 'pk_id_user_message',
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
        idUserSender: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fk_id_user_sender'
        },
        idUserReceiver: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fk_id_user_receiver'
        }
        
    }, {
        tableName: 'user_message_user',
        updatedAt: false
    });
    
    user_message_userModel.belongsTo(userModel, {
        foreignKey: {
            name : 'idUserSender',
            field: 'fk_id_user_sender'
          },
          as: 'userSender'
    });

    user_message_userModel.belongsTo(userModel, {
        foreignKey: {
            name: 'idUserReceiver',
            field: 'fk_id_user_receiver'
          },
          as: 'userReceiver'
    });


    return user_message_userModel;
};