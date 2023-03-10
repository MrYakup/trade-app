const transactionModel = require("../models/transactionModel");
const shareModel = require("../models/shareModel");
const PortfolioModel = require("../models/portfolioModel");
const purchasedShareStockModel = require("../models/purchasedShareStockModel");
const { Op } = require("sequelize");

const allTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.findAll();
    // const hasPortfolio = await transactionModel.findOne({ where: { shareId: 1 } });
    return res.status(200).json({
      success: true,
      message: "successfully get all transactions",
      transactions,
      // hasPortfolio
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const buyTransaction = async (req, res) => {
  try {
    const { portfolioId, shareId, quantity } = req.body;

    if (!portfolioId || !shareId || !quantity)
      return res.status(400).json({
        success: false,
        message: `missing parameter ${!portfolioId ? "portfolioId" : ""} ${!shareId ? "ShareId" : ""} ${!quantity ? "quantity" : ""} `,
      });

    const hasPortfolio = await PortfolioModel.findOne({ where: { id: portfolioId } });

    if (!hasPortfolio) return res.status(400).json({ success: false, message: "You donn't have a portfolio, firstly create a portfolio" });

    const hasShare = await shareModel.findOne({ where: { id: shareId } });
    if (!hasShare) return res.status(400).json({ success: false, message: "share not found" });

    if (hasShare.quantity >= quantity) {
      await hasShare.decrement("quantity", { by: quantity });

      const hasPurchased = await purchasedShareStockModel.findOne({
        where: {
          [Op.and]: [{ portfolioId: portfolioId }, { shareId: shareId }],
        },
      });
      console.log("haspurchased", hasPurchased);

      if (hasPurchased) {
        await hasPurchased.increment("quantity", { by: quantity });
      } else {
        const newShare = {
          quantity: quantity,
          price: hasShare.price,
          symbol: hasShare.symbol,
          portfolioId: portfolioId,
          shareId: shareId,
        };

        await purchasedShareStockModel.create(newShare);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "not enough shares",
      });
    }

    const newTransaction = await transactionModel.create({
      portfolioId,
      shareId,
      quantity,
    });

    return res.status(200).json({
      success: true,
      message: "successfully purchased",
      newTransaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sellTransaction = async (req, res) => {
  try {
    const { portfolioId, shareId, quantity } = req.body;

    if (!portfolioId || !shareId || !quantity)
      return res.status(400).json({
        success: false,
        message: `missing parameter ${!portfolioId ? "portfolioId" : ""} ${!shareId ? "ShareId" : ""} ${!quantity ? "quantity" : ""} `,
      });

    const hasPortfolio = await PortfolioModel.findOne({ where: { id: portfolioId } });
    if (!hasPortfolio) return res.status(400).json({ success: false, message: "You donn't have a portfolio, firstly create a portfolio" });

    const haveYouShare = await purchasedShareStockModel.findOne({
      where: {
        [Op.and]: [{ portfolioId: portfolioId }, { shareId: shareId }],
      },
    });

    if (haveYouShare.quantity >= quantity) {
      await haveYouShare.decrement("quantity", { by: quantity });
    } else {
      return res.status(400).json({
        success: false,
        message: "you do not have as many shares as you requested for sale, try to reduce the amount ",
      });
    }
    const newTransaction = await transactionModel.create({
      portfolioId,
      shareId,
      quantity,
    });

    return res.status(200).json({
      success: true,
      message: "successfully sold",
      newTransaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  allTransactions,
  buyTransaction,
  sellTransaction,
};
