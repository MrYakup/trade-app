const shareModel = require("../models/shareModel");
const portfolioModel = require("../models/portfolioModel");
const purchasedShareStockModel = require("../models/purchasedShareStockModel");
const sequelize = require("sequelize");

const allShares = async (req, res) => {
  try {
    const shares = await shareModel.findAll();
    return res.status(200).json({ success: true, message: "successfully get all shares", shares });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addShare = async (req, res) => {
  try {
    const { symbol, price, quantity, portfolioId } = req.body;

    const hasPortfolio = await portfolioModel.findOne({ where: { id: portfolioId } });
    if (!hasPortfolio) return res.status(400).json({ success: false, message: "You have not a portfolio, firstly create a portfolio" });

    if (!symbol || !price || !quantity || !portfolioId) return res.status(400).json({ success: false, message: "Invalid data" });

    const newSymbol = await symbol.toUpperCase();
    const newShare = await shareModel.create({
      quantity,
      price,
      symbol: newSymbol,
      portfolioId,
    });
    return res.status(200).json({ success: true, message: "successfully created", newShare });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateShare = async (req, res) => {
  try {
    const { price } = req.body;
    const { id } = req.params;

    if (!price || !id) return res.status(400).json({ success: false, message: "Invalid price or id" });

    const share = await shareModel.findByPk(id);
    const purchasedShare = await purchasedShareStockModel.findOne({
      where: {
        shareId: id,
      },
    });

    // const date = new Date().getTime();

    if (share) {
      const avaliableTime = new Date(share.updatedAt).getTime() + 60 * 60 * 1000;
      const now = new Date().getTime();

      // console.log(now > avaliableTime);
      // console.log(new Date(avaliableTime - now).getMinutes());
      const remainingTime = new Date(avaliableTime - now).getMinutes();

      if (now < avaliableTime) {
        // const updatedShare = await shareModel.update(
        //   { price: price },
        //   {
        //     where: {
        //       id: id,
        //     },
        //   }
        // );

        // await share.price.push(price);
        // const updatedShare = await share.save();
        // console.log(updatedShare)

        // await purchasedShare.price.push(price);
        // await purchasedShare.save();

        const updatedShare = shareModel.update(
          { price: sequelize.fn("array_append", sequelize.col("price"), price) },
          { where: { id: id } }
        );
        const updatedPurchasedShare = purchasedShareStockModel.update(
          { price: sequelize.fn("array_append", sequelize.col("price"), price) },
          { where: { shareId: id } }
        );

        return res.status(200).json({
          success: true,
          message: "successfully updated share",
          updatedShare,
          updatedPurchasedShare,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "share is not avaliable for updated",
          remainingTime: `${remainingTime} minutes`,
        });
      }
    } else {
      return res.status(400).json({ success: false, message: "share not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  allShares,
  addShare,
  updateShare,
};
