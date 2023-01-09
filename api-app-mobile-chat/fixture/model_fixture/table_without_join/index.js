let salon = require("./salon");
let role = require("./role");
let user = require("./user");



let fixturewithout = [];

salon.forEach((value) =>{
    fixturewithout.push(value);
})

role.forEach((value) =>{
    fixturewithout.push(value);
})

user.forEach((value) =>{
    fixturewithout.push(value);
})

module.exports = fixturewithout;