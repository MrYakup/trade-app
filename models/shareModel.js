const { DataTypes } = require("sequelize");
const db = require("../config/database");

const ShareModel = db.sequelize.define(
  "share",
  {
    symbol: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    // symbolUppercase: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.getDataValue("symbol").toUpperCase();
    //   },
    // },
    price: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    charset: "UTF-8",
    timestamps: true,
  }
);

module.exports = ShareModel;
