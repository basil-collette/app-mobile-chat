
const sequelize_fixtures = require('sequelize-fixtures');
const connexion = require('../database/sequelize');
const models_without_join = { user: require('../models/user.model')(connexion), role: require('../models/role.model')(connexion), salon: require('../models/salon.model')(connexion) };
const models_with_join = { user_message_salon: require('../models/user_message_salon.model')(connexion), user_message_user: require('../models/user_message_user.model')(connexion), user_possede_role: require('../models/user_possede_role.model')(connexion) };
const fixtures_without_join = require('./model_fixture/table_without_join');
const fixtures_with_join = require('./model_fixture/table_with_join');



models_with_join.user_message_salon.destroy({
    where: {},
    truncate: true
})

models_with_join.user_message_user.destroy({
    where: {},
    truncate: true
})

models_with_join.user_possede_role.destroy({
    where: {},
    truncate: true
})

models_without_join.user.destroy({
    where: {},
    truncate: true
})

models_without_join.salon.destroy({
    where: {},
    truncate: true
})

models_without_join.role.destroy({
    where: {},
    truncate: true
})




sequelize_fixtures.loadFixtures(fixtures_without_join, models_without_join, {
    logger: {
        debug: console.log,
        info: console.log,
        warn: console.log,
        error: console.error('OH NO! ERROR WITHOUT JOIN')
    }
}).then(function () {

    sequelize_fixtures.loadFixtures(fixtures_with_join, models_with_join, {
        logger: {
            debug: console.log,
            info: console.log,
            warn: console.log,
            error: console.error('OH NO! ERROR WITH JOIN')
        }
    }).then(function () {
        console.log("fixture loaded !")
    })
}).catch((error) => {
    console.log(error)
})

