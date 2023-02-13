'use strict';
const Sequelize = require("sequelize");

//const dbPath = path.resolve(__dirname, "chat.sqlite");

let dbConnexionInstance = null;

function connect() {
  return new Sequelize("app-mobile-chat", "root", "", {
      host: "localhost",
      dialect: "mysql",
      logging: false,
      //storage: dbPath,
      define: {
          timestamps: true,
          freezeTableName: true
      },
      dialectModule: require('mysql2'),
  });
}

const getConnection = () => {
  if (!dbConnexionInstance) {
    dbConnexionInstance = connect();
  }

  return dbConnexionInstance;
};

module.exports = getConnection();