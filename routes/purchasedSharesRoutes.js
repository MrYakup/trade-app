const express = require("express");
const router = express.Router();
const {
  allPurchasedShares,
  findPurchasedSharesByPortfolioId
} = require("../controllers/purchasedSharesController");

router.route("/all").get(allPurchasedShares);
router.route("/:id").get(findPurchasedSharesByPortfolioId);

module.exports = router;
