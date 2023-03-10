const { DataTypes } = require("sequelize");
const db = require("../config/database");

const TransactionModel = db.sequelize.define("transaction", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TransactionModel;
