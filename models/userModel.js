const { DataTypes } = require("sequelize");
const db = require("../config/database");
const portfolioModel = require("./portfolioModel");

const UserModel = db.sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(48),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserModel.hasMany(portfolioModel, {
  foreinkey: "userId",
  sourceKey: "id",
});
portfolioModel.belongsTo(UserModel, { foreinkey: "userId", targetId: "id" });

module.exports = UserModel;
