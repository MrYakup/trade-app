const { DataTypes } = require("sequelize");
const db = require("../config/database");

const purchasedShareStockModel = db.sequelize.define("purchasedShareStock", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [],
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shareId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  portfolioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = purchasedShareStockModel;
