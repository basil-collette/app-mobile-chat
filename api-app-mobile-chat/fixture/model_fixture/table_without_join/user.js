
const faker = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { values } = require('./salon');
let user = [];

for (i = 0; i < 10; i++) {
    user.push({
        model: 'user',
        data: {
            email: faker.faker.internet.email(),
            prenom: faker.faker.name.firstName(),
            nom: faker.faker.name.lastName(),
            password: bcrypt.hashSync('password',10),
            createdAt: faker.faker.date.past()
        }
    })
}

module.exports = user;

  




