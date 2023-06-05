const { DataTypes } = require("sequelize");
const { db } = require("./../database/config");

const User = db.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    enum: ["client", "employee"],
    defaultValue: "client"
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "available",
  },
});

module.exports = User;