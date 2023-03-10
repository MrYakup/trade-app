const { DataTypes } = require("sequelize");
const db = require("../config/database");
const shareModel = require("./shareModel");
const transactionModel = require("./transactionModel");
const purchasedShareStockModel = require("./purchasedShareStockModel");

const PortfolioModel = db.sequelize.define("portfolio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

PortfolioModel.hasMany(shareModel, {
  foreinkey: "portfolioId",
  sourceKey: "id",
});
shareModel.belongsTo(PortfolioModel, { foreinkey: "portfolioId", targetId: "id" });

PortfolioModel.hasMany(transactionModel, {
  foreinkey: "portfolioId",
  sourceKey: "id",
});
transactionModel.belongsTo(PortfolioModel, { foreinkey: "portfolioId", targetId: "id" });

PortfolioModel.hasMany(purchasedShareStockModel, {
  foreinkey: "portfolioId",
  sourceKey: "id",
});
purchasedShareStockModel.belongsTo(PortfolioModel, { foreinkey: "portfolioId", targetId: "id" });

module.exports = PortfolioModel;
