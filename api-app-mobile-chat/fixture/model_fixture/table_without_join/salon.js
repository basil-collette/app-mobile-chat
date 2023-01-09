const faker = require('@faker-js/faker');

module.exports = [
    {
        model: "salon",
        data: {
            libelle: "Général",
            createdAt : faker.faker.date.past()
        },
        
    }
];