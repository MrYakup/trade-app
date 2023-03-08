const { DataTypes } = require("sequelize");
const db = require("../config/database");

const TransactionModel = db.sequelize.define(
  "transaction",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    charset: "UTF-8",
    timestamps: true,
  }
);

module.exports = TransactionModel;
