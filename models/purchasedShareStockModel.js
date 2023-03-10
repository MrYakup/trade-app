const { DataTypes } = require("sequelize");
const db = require("../config/database");

const purchasedShareStockModel = db.sequelize.define("purchasedShareStock", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
});

module.exports = purchasedShareStockModel;
