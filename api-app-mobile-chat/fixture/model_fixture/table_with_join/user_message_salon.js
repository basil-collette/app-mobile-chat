const faker = require('@faker-js/faker');

let user_message_salon = [];

const RandomInt = (min,max) => {
    return Math.floor(
        Math.random() * (max - min) + min
      )
}


for (i = 0; i < 100; i++) {

    user_message_salon.push({
        model: "user_message_salon",
        data: {
            content: faker.faker.lorem.words(RandomInt(3, 20)),
            createdAt: faker.faker.date.past(),
            idUser: RandomInt(1,10),
            idSalon: 1
        }
    })
}



module.exports = user_message_salon;