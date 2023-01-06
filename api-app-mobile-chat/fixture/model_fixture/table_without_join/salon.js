
const faker = require('@faker-js/faker');
module.exports = [
    {
        model: "salon",
        data: {
            libelle: "GENERAL",
            createdAt : faker.faker.date.past()
        },
        
    }
];