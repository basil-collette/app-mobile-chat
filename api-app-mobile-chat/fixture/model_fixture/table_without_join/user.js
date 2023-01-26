
const faker = require('@faker-js/faker');
const bcrypt = require('bcrypt');
let user = [];

//casual user
user.push({
    model: 'user',
    data: {
        email: 'user@gmail.com',
        prenom: 'user',
        nom: 'user',
        password: bcrypt.hashSync('password', 10),
        createdAt: faker.faker.date.past()
    }
})

//admin user
user.push({
    model: 'user',
    data: {
        email: 'admin@gmail.com',
        prenom: 'admin',
        nom: 'admin',
        password: bcrypt.hashSync('password', 10),
        createdAt: faker.faker.date.past()
    }
})

//adding 8 users to have 10 users in db
for (i = 0; i < 18; i++) {
    user.push({
        model: 'user',
        data: {
            email: faker.faker.internet.email(),
            prenom: faker.faker.name.firstName(),
            nom: faker.faker.name.lastName(),
            password: bcrypt.hashSync('password', 10),
            createdAt: faker.faker.date.past()
        }
    })
}

module.exports = user;

  




