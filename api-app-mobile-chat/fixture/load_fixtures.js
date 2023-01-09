
const sequelize_fixtures = require('sequelize-fixtures');
const connexion = require('../database/sequelize');
const models_without_join = { user: require('../models/user.model')(connexion), role: require('../models/role.model')(connexion), salon: require('../models/salon.model')(connexion) };
const models_with_join = { user_message_salon: require('../models/user_message_salon.model')(connexion), user_message_user: require('../models/user_message_user.model')(connexion), user_possede_role: require('../models/user_possede_role.model')(connexion) };
const fixtures_without_join = require('./model_fixture/table_without_join');
const fixtures_with_join = require('./model_fixture/table_with_join');

//truncate all tables
const truncateTables = async () => {
    for (const [key, value] of Object.entries(models_with_join)) {
        await value.destroy({
            where: {},
            truncate: { cascade: true },
            restartIdentity: true
        })
    }

    for (const [key, value] of Object.entries(models_without_join)) {
        await value.destroy({
            where: {},
            truncate: { cascade: true },
            restartIdentity: true
        })
    }
}

//reset to 1, the identity id of tables
const resetIdentityTables = async () => {
    for (const [key, value] of Object.entries(models_with_join)) {
        console.log(`ALTER TABLE ${key.toString()} AUTO_INCREMENT = 0;`);
        await connexion.query(`ALTER TABLE ${key.toString()} AUTO_INCREMENT = 0;`);
    }

    for (const [key, value] of Object.entries(models_without_join)) {
        console.log(`ALTER TABLE ${key.toString()} AUTO_INCREMENT = 0;`);
        await connexion.query(`ALTER TABLE ${key.toString()} AUTO_INCREMENT = 0;`);
    }
}

//insert fixtures in db
const loadAllFixtures = async() => {
    await sequelize_fixtures.loadFixtures(fixtures_without_join, models_without_join, {
        logger: {
            debug: console.log,
            info: console.log,
            warn: console.log,
            error: console.error("ERROR : Fixtures without join ")
        }
    });
    
    await sequelize_fixtures.loadFixtures(fixtures_with_join, models_with_join, {
        logger: {
            debug: console.log,
            info: console.log,
            warn: console.log,
            error: console.error('ERROR : Fixtures with join')
        }
    });

    console.log("fixtures loaded !");
}

const runFixtures = async () => {
    await truncateTables();
    await resetIdentityTables();
    await loadAllFixtures();
}

runFixtures();



