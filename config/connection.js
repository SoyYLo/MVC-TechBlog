const Sequelize = require('sequelize');
// Access to .env variables
require('dotenv').config();

//Create connection object for database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'psql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

//Export sequelize
module.exports = sequelize;