const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PortfolioModel = db.sequelize.define("portfolio", {});

module.exports = PortfolioModel;
