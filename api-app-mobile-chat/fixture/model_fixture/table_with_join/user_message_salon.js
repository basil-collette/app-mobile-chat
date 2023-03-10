const faker = require('@faker-js/faker');
const NumberHelper = require('../../../helpers/NumberHelper');

let user_message_salon = [];
for (i = 0; i < 102; i++) {

    user_message_salon.push({
        model: "user_message_salon",
        data: {
            content: faker.faker.lorem.words(NumberHelper.randomInt(3, 20)),
            createdAt: faker.faker.date.past(),
            idUser: NumberHelper.randomInt(1, 20),
            idSalon: 1
        }
    })
}

module.exports = user_message_salon;