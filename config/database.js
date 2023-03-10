const { Sequelize } = require("sequelize");
let db = {};

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  database: "EvaExchangeApi",
  username: "postgres",
  password: "qwe123qwe",
  port: 5432,
  pool: 40,
  retry: 3,
  logging: true,
});

// const sequelize = new Sequelize({
//   host: "dpg-cg4cu0hmbg5d885ej02g-a",
//   dialect: "postgres",
//   database: "evaexchange",
//   username: "yakup",
//   password: "S8aXljevKr0e59zmkVrOeagIn27qp8ue",
//   port: 5432,
//   pool: 40,
//   retry: 3,
//   logging: true,
// });

const CONNECT_DB = async (req, res) => {
  try {
    await sequelize.authenticate({ logging: true });
    console.log("Connected to database");
  } catch (error) {
    return console.log("Unable to connect to the database:", error.message);
  }
};

const REFRESH_DB = async (req, res) => {
  try {
    sequelize.sync({ force: true });
  } catch (error) {
    return console.log(error.message);
  }
};

db.sequelize = sequelize;
db.CONNECT_DB = CONNECT_DB;
db.REFRESH_DB = REFRESH_DB;

module.exports = db;
