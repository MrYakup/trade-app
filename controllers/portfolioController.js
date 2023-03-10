const portfolioModel = require("../models/portfolioModel");
const userModel = require("../models/userModel");

const allPortfolios = async (req, res) => {
  try {
    const portfolios = await portfolioModel.findAll();
    return res.status(200).json({
      success: true,
      message: "All portfolios got successfully",
      portfolios,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const findPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: "Invalid portfolio" });

    const portfolio = await portfolioModel.findByPk(id);
    return res.status(200).json({ success: true, message: "Portfolio got successfully", portfolio });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: "Invalid UserId" });

    const hasUser = await userModel.findOne({ where: { id: userId } });
    if (!hasUser) return res.status(400).json({ success: false, message: "You have not an account, firstly create an account" });

    const hasPortfolio = await portfolioModel.findOne({ where: { userId: userId } });
    if (hasPortfolio) return res.status(400).json({ success: false, message: "You already have a portfolio, please check it" });

    const newPortfolio = await portfolioModel.create({ userId });

    return res.status(200).json({ success: true, message: "Portfolio created successfully", newPortfolio });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  allPortfolios,
  findPortfolioById,
  createPortfolio,
};
