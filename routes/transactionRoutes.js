const express = require("express");
const router = express.Router();
const {
  allTransactions,
  buyTransaction,
  sellTransaction,
} = require("../controllers/transactionController");

router.route("/all").get(allTransactions);
router.route("/buy").post(buyTransaction);
router.route("/sell").post(sellTransaction);

module.exports = router;
