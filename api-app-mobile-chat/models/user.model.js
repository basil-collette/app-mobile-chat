const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    const roleModel = require("./role.model")(sequelize);
    const user_possede_role = require("./user_possede_role.model")(sequelize);

    const userModel = sequelize.define("user", {
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
        }
    }, {
        tableName: 'user',
        updatedAt: false
    });

    userModel.belongsToMany(roleModel, {
        through: user_possede_role,
        as: 'roles',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    roleModel.belongsToMany(userModel, {
        through: user_possede_role,
        as: 'users',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });

    /*
    userModel.beforeCreate("save", await async function(next) {
        //const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    userModel.beforeUpdate("save", await async function(next) {
        //const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });
    */

    return userModel;
};