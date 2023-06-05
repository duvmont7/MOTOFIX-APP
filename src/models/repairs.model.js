const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repairs = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Repairs;
