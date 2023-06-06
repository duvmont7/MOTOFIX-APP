const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: 'available',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: 'available',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: 'available',
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    enum: ['client', 'employee'],
    defaultValue: 'client',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;
