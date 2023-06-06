const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repairs = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: 'pending',
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: 'pending',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: 'pending',
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: 'pending',
  },
});

module.exports = Repairs;
