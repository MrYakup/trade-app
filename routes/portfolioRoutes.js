const express = require("express");
const router = express.Router();
const {
  allPortfolios,
  findPortfolioById,
  createPortfolio
} = require("../controllers/portfolioController");

router.route("/all").get(allPortfolios);
router.route("/:id").get(findPortfolioById);
router.route("/").post(createPortfolio);

module.exports = router;
