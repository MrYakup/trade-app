const { DataTypes } = require("sequelize");
const db = require("../config/database");
const transactionModel = require("./transactionModel");
const purchasedShareStockModel = require("./purchasedShareStockModel");

const ShareModel = db.sequelize.define("share", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.STRING(),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 3],
        msg: "must be 3 characters",
      },
      isUppercase: {
        args: true,
        msg: "must be all capital letters",
      },
    },
  },
  price: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [],
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ShareModel.hasMany(transactionModel, {
  foreinkey: "shareId",
  sourceKey: "id",
});
transactionModel.belongsTo(ShareModel, { foreinkey: "shareId", targetId: "id" });

ShareModel.hasMany(purchasedShareStockModel, {
  foreinkey: "shareId",
  sourceKey: "id",
});
purchasedShareStockModel.belongsTo(ShareModel, { foreinkey: "shareId", targetId: "id" });

module.exports = ShareModel;
