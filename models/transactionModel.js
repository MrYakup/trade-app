const { DataTypes } = require("sequelize");
const db = require("../config/database");

const TransactionModel = db.sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TransactionModel;
