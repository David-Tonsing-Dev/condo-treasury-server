const { Web3 } = require("web3");
const axios = require("axios");
const {
  getBaseBalance,
  getEtherBalance,
  getPolyBalance,
} = require("../utils/constract");
const { getMarketData } = require("../utils/urls");
const {
  get24hPrice,
  get30dPrice,
  get7dPrice,
  get24hMarketCap,
  getTotal,
} = require("../helpers/priceChange");
const { condoABI } = require("../utils/constants/abis");
const {
  addressToCheck,
  condoAirdropAddress,
} = require("../utils/constants/addresses");

const COINGECKO_URL = "https://pro-api.coingecko.com/api/v3";
const options = {
  headers: {
    "x-cg-pro-api-key": process.env.COINGECKO_KEY,
    "Access-Control-Allow-Origin": "*",
  },
};

const getPortfolioData = async (req, res) => {
  try {
    const walletCondoBalance = await getBaseBalance(condoABI, addressToCheck);
    const walletAirdropBalance = await getBaseBalance(
      condoABI,
      condoAirdropAddress
    );
    const walletEtherBalance = await getEtherBalance(addressToCheck);
    const walletAurusBalance = await getPolyBalance(25417);

    const condoMarketData = await getMarketData("condo");
    const ethMarketData = await getMarketData("ethereum");
    const aurusxMarketData = await getMarketData("aurusx");

    const walletCondoBalanceUSD =
      walletCondoBalance * condoMarketData.current_price;
    const walletAirdropBalanceUSD =
      walletAirdropBalance * condoMarketData.current_price;
    const walletEtherBalanceUSD =
      walletEtherBalance * ethMarketData.current_price;
    const walletAurusBalanceUSD =
      walletAurusBalance * aurusxMarketData.current_price;

    const wallet24hBalance = [
      {
        balanceUSD: walletCondoBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletAirdropBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletEtherBalanceUSD,
        changePercentage: ethMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletAurusBalanceUSD,
        changePercentage: aurusxMarketData.price_change_percentage_7d,
      },
    ];

    const portfolio24h = getTotal(wallet24hBalance, get24hPrice);

    const wallet7dBalance = [
      {
        balanceUSD: walletCondoBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_7d,
      },
      {
        balanceUSD: walletAirdropBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_7d,
      },
      {
        balanceUSD: walletEtherBalanceUSD,
        changePercentage: ethMarketData.price_change_percentage_7d,
      },
      {
        balanceUSD: walletAurusBalanceUSD,
        changePercentage: aurusxMarketData.price_change_percentage_7d,
      },
    ];

    const portfolio7d = getTotal(wallet7dBalance, get7dPrice);

    const wallet30dBalance = [
      {
        balanceUSD: walletCondoBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_30d,
      },
      {
        balanceUSD: walletAirdropBalanceUSD,
        changePercentage: condoMarketData.price_change_percentage_30d,
      },
      {
        balanceUSD: walletEtherBalanceUSD,
        changePercentage: ethMarketData.price_change_percentage_30d,
      },
      {
        balanceUSD: walletAurusBalanceUSD,
        changePercentage: aurusxMarketData.price_change_percentage_30d,
      },
    ];

    const portfolio30d = getTotal(wallet30dBalance, get30dPrice);

    const wallet24hMarketCap = [
      {
        balanceUSD: walletCondoBalanceUSD,
        changePercentage: condoMarketData.market_cap_change_percentage_24h,
      },
      {
        balanceUSD: walletAirdropBalanceUSD,
        changePercentage: condoMarketData.market_cap_change_percentage_24h,
      },
      {
        balanceUSD: walletEtherBalanceUSD,
        changePercentage: ethMarketData.market_cap_change_percentage_24h,
      },
      {
        balanceUSD: walletAurusBalanceUSD,
        changePercentage: aurusxMarketData.market_cap_change_percentage_24h,
      },
    ];

    const portfolioMarketCap24h = getTotal(wallet24hMarketCap, get24hMarketCap);

    return res.json({
      status: true,
      portfolio: {
        price_change_24h: portfolio24h,
        price_change_7d: portfolio7d,
        price_change_30d: portfolio30d,
        market_cap_change_24h: portfolioMarketCap24h,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getPortfolioHistorical = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = {
  getPortfolioData,
  getPortfolioHistorical,
};
