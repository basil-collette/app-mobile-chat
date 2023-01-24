const faker = require('@faker-js/faker');
const NumberHelper = require('../../../helpers/NumberHelper');

let user_message_user = [];
for (i = 0; i < 1000; i++) {

    let user_sender = NumberHelper.randomInt(1, 10);
    let user_receiver = NumberHelper.differentInt(user_sender, 10);

    user_message_user.push({
        model: "user_message_user",
        data: {
            content: faker.faker.lorem.words(NumberHelper.randomInt(3, 20)),
            createdAt: faker.faker.date.past(),
            idUserSender : user_sender,
            idUserReceiver:  user_receiver
        }
    })
}

module.exports = user_message_user;