const faker = require('@faker-js/faker');
const NumberHelper = require('../../../helpers/NumberHelper');

let user_possede_role = [];

user_possede_role.push({
    model: "user_possede_role",
    data: {
        userIdUser: 1,
        roleIdRole: 1
    }
});

user_possede_role.push({
    model: "user_possede_role",
    data: {
        userIdUser: 2,
        roleIdRole: 2
    }
});

for (i = 2; i < 10; i++) {
    user_possede_role.push({
        model: "user_possede_role",
        data: {
            userIdUser: i + 1,
            roleIdRole: NumberHelper.randomInt(1, 2)
        }
    });
}

module.exports = user_possede_role;