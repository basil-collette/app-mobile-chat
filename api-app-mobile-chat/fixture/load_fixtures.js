
const sequelize_fixtures = require('sequelize-fixtures');
const connexion = require('../database/sequelize');
const models_without_join = { user: require('../models/user.model')(connexion), role: require('../models/role.model')(connexion), salon: require('../models/salon.model')(connexion) };
const models_with_join = { user_message_salon: require('../models/user_message_salon.model')(connexion), user_message_user: require('../models/user_message_user.model')(connexion), user_possede_role: require('../models/user_possede_role.model')(connexion) };
const fixtures_without_join = require('./model_fixture/table_without_join');
const fixtures_with_join = require('./model_fixture/table_with_join');


const truncateTable = async() =>{
    await models_with_join.user_message_salon.destroy({
        where: {},
        truncate: { cascade: true }
    })
    
    await models_with_join.user_message_user.destroy({
        where: {},
        truncate: { cascade: true }
    })
    
    await models_with_join.user_possede_role.destroy({
        where: {},
        truncate: { cascade: true }
    })
    
    await models_without_join.user.destroy({
        where: {},
        truncate: { cascade: true }
    })
    
    await models_without_join.salon.destroy({
        where: {},
        truncate: { cascade: true }
    })
    
    await models_without_join.role.destroy({
        where: {},
        truncate: { cascade: true }
    })
} 

const resetAutoIncrement = async () => {
    await connexion.query('ALTER TABLE user AUTO_INCREMENT = 0;');
    await connexion.query('ALTER TABLE role AUTO_INCREMENT = 0;');
    await connexion.query('ALTER TABLE salon AUTO_INCREMENT = 0;');
    await connexion.query('ALTER TABLE user_message_user AUTO_INCREMENT = 0;');
    await connexion.query('ALTER TABLE user_message_salon AUTO_INCREMENT = 0;');
    await connexion.query('ALTER TABLE user_possede_role AUTO_INCREMENT = 0;');
}


const loadAllFixtures = async() => {
    sequelize_fixtures.loadFixtures(fixtures_without_join, models_without_join, {
        logger: {
            debug: console.log,
            info: console.log,
            warn: console.log,
            error: console.error("ERROR : Fixtures without join ")
        }
    }).then(function () {
        sequelize_fixtures.loadFixtures(fixtures_with_join, models_with_join, {
            logger: {
                debug: console.log,
                info: console.log,
                warn: console.log,
                error: console.error('ERROR : Fixtures with join')
            }
        }).then(function () {
            console.log("fixtures loaded !")
        })
    }).catch((error) => {
        console.log(error)
    })
}

const Execute = async () =>{
    await truncateTable();
    await resetAutoIncrement();
    await loadAllFixtures();
}

Execute();



