const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PortfolioModel = db.sequelize.define(
  "portfolio",
  {

  },
  {
    createdAt: true,
    updatedAt: true,
    timestamps: true,
  }
);

module.exports = PortfolioModel;
