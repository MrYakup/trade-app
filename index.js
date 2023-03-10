const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const corsOptions = require("./config/corsOptions");
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/userRoutes"));
app.use("/portfolios", require("./routes/portfolioRoutes"));
app.use("/shares", require("./routes/shareRoutes"));
app.use("/transactions", require("./routes/transactionRoutes"));
app.use("/purchasedShares", require("./routes/purchasedSharesRoutes"));

app.listen(PORT, async () => {
  // db.REFRESH_DB();
  await db.CONNECT_DB();
  console.log(`server is running on port ${PORT}`);
});
