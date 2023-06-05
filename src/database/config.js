const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'motofix_db',
  loggin: false,
});

module.exports = { db };
