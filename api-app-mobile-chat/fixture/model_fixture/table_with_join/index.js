const user_message_salon = require("./user_message_salon");
const user_message_user = require("./user_message_user");
const user_possede_role = require("./user_possede_role");

let fixturewith= [];

user_message_salon.forEach((value) =>{
    fixturewith.push(value);
})

user_message_user.forEach((value) =>{
    fixturewith.push(value);
})

user_possede_role.forEach((value) =>{
    fixturewith.push(value);
})

module.exports = fixturewith;