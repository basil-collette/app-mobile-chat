const faker = require('@faker-js/faker');


const RandomInt = (min,max) => {
    return Math.floor(
        Math.random() * (max - min) + min
      )
}

let user_possede_role = [];

for (i = 0; i < 10; i++) {
    user_possede_role.push({
        model: "user_possede_role",
        data: {
            userIdUser: i + 1,
            roleIdRole: RandomInt(1,2)
        }
    });
}

user_possede_role.push({
    model: "user_possede_role",
    data: {
        userIdUser: 11,
        roleIdRole: 1
    }
});

user_possede_role.push({
    model: "user_possede_role",
    data: {
        userIdUser: 12,
        roleIdRole: 2
    }
});

module.exports = user_possede_role;