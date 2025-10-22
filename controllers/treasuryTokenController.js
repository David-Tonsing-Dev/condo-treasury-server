const { fetchTreasuryChart } = require("../helpers/fetchTreasuryChart");
const TreasuryToken = require("../models/condoTreasuryTokenModel");
const getAllTreasuryToken = async (req, res) => {
  try {
    const treasuryTokens = await TreasuryToken.find();

    const totalBalanceUsd = treasuryTokens.reduce((acc, token) => {
      return acc + (token.balanceUsd || 0);
    }, 0);

    return res.status(200).json({
      status: true,
      treasuryTokens: treasuryTokens,
      totalBalance: totalBalanceUsd,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getTreasuryChart = async (req, res) => {
  try {
    const data = await fetchTreasuryChart();
    return res.status(200).json({
      status: true,
      portfolioHistorical: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getAllTreasuryToken, getTreasuryChart };
