const { DataTypes } = require("sequelize");
const db = require("../config/database");

const UserModel = db.sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING(48),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
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

// UserModel.addHook("afterCreate", (model) => {
//   //sms gönderimi , email gönderimi
//   console.log(`${model.email} was created`);
// });

module.exports = UserModel;
