const faker = require('@faker-js/faker');

module.exports = [
    {
        model: "role",
        data: {
            libelle: "Admin",
            code : "admin",
            createdAt : faker.faker.date.past()
        }
    },
    {
        model: "role",
        data: {
            libelle: "User",
            code: "user",
            createdAt : faker.faker.date.past()
        }
    }
];