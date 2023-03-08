const { Sequelize } = require("sequelize");
let db = {};

const sequelize = new Sequelize({
  host: "dpg-cg4cu0hmbg5d885ej02g-a",
  dialect: "postgres",
  database: "evaexchange",
  username: "yakup",
  password: "S8aXljevKr0e59zmkVrOeagIn27qp8ue",
  port: 5432,
  pool: 40,
  retry: 3,
  logging: true,
});

const CONNECT_DB = async (req, res) => {
  try {
    await sequelize.authenticate({ logging: true });
    console.log("Connected to database");
  } catch (error) {
    return console.log(error.message);
  }
};

const REFRESH_DB = async (req, res) => {
  try {
    const userModel = require("../models/userModel");
    const shareModel = require("../models/shareModel");
    const transactionModel = require("../models/transactionModel");
    const portfolioModel = require("../models/portfolioModel");
    const purchasedShareStockModel = require("../models/purchasedShareStockModel");

    userModel.hasOne(portfolioModel);
    portfolioModel.belongsTo(userModel);

    portfolioModel.hasMany(shareModel);
    shareModel.belongsTo(portfolioModel);

    shareModel.hasMany(transactionModel);
    transactionModel.belongsTo(shareModel);

    portfolioModel.hasMany(transactionModel);
    transactionModel.belongsTo(portfolioModel);

    portfolioModel.hasMany(purchasedShareStockModel);
    purchasedShareStockModel.belongsTo(portfolioModel);

    
    // sequelize.sync({ force: true });
  } catch (error) {
    return console.log(error.message);
  }
};

db.sequelize = sequelize;
db.CONNECT_DB = CONNECT_DB;
db.REFRESH_DB = REFRESH_DB;

module.exports = db;
