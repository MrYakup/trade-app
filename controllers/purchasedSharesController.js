const purchasedShareStockModel = require("../models/purchasedShareStockModel");

const allPurchasedShares = async (req, res) => {
  try {
    const purchasedShares = await purchasedShareStockModel.findAll();
    return res.status(200).json({ success: true, message: "successfully get all purchasedShares", purchasedShares });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const findPurchasedSharesByPortfolioId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: "Invalid portfolio" });

    const purchasedPortfolioShares = await purchasedShareStockModel.findAll({ where: { portfolioId: id } });

    if (!purchasedPortfolioShares) return res.status(400).json({ success: false, message: "Not Found" });

    return res.status(200).json({
      success: true,
      message: purchasedPortfolioShares.length ? "successfully get purchasedPortfolioShares" : "You have not any purchasedPortfolioShares",
      purchasedPortfolioShares,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  allPurchasedShares,
  findPurchasedSharesByPortfolioId,
};
