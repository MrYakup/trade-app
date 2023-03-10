const { DataTypes } = require("sequelize");
const db = require("../config/database");

const ShareModel = db.sequelize.define("share", {
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

module.exports = ShareModel;
