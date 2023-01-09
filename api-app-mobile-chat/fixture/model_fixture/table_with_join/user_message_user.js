const faker = require('@faker-js/faker');

let user_message_user = [];

const RandomInt = (min,max) => {
    return Math.floor(
        Math.random() * (max - min) + min
      )
}

const DifferentInt = (number, mbmax) => {
    let newnumber;

    do {
        newnumber = RandomInt(1, mbmax)
    } while (number === newnumber)

    return newnumber;
}

for(i = 0; i < 100; i++){

let user_sender = RandomInt(1,12);
let user_receiver = DifferentInt(user_sender,12);

user_message_user.push({
        model: "user_message_user",
        data: {
            content: faker.faker.lorem.words(12),
            createdAt: faker.faker.date.past(),
            idUserSender : user_sender,
            idUserReceiver:  user_receiver
        }
})
}



module.exports = user_message_user;