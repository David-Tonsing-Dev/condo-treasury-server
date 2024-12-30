const {
  getBaseBalance,
  getEtherBalance,
  getPolyBalance,
  getBaseTokenBalance,
  getPolygonBalance,
} = require("../utils/constract");
const {
  getMarketData,
  getHistoricalTokenPrice,
  fetchTokenHistoricalPrice,
} = require("../utils/urls");
const { getTotal } = require("../helpers/priceChange");
const { condoABI, polytradeABI } = require("../utils/constants/abis");
const {
  addressToCheck,
  condoAirdropAddress,
  polytradeAddress,
} = require("../utils/constants/addresses");
const { walletValue } = require("../helpers/walletValue");

const getPortfolioData = async (req, res) => {
  try {
    const walletCondoBalance = await getBaseBalance(condoABI, addressToCheck);
    const walletAirdropBalance = await getBaseBalance(
      condoABI,
      condoAirdropAddress
    );
    const walletEtherBalance = await getEtherBalance(addressToCheck);
    const walletAurusBalance = await getPolyBalance(25417);

    const walletPolygonBalance = await getPolygonBalance(
      polytradeABI,
      polytradeAddress
    );

    const condoMarketData = await getMarketData("condo");
    const ethMarketData = await getMarketData("ethereum");
    const aurusxMarketData = await getMarketData("aurusx");
    const polytradeMarketData = await getMarketData("polytrade");

    const walletCondoBalanceUSD =
      walletCondoBalance * condoMarketData.current_price;
    const walletAirdropBalanceUSD =
      walletAirdropBalance * condoMarketData.current_price;
    const walletEtherBalanceUSD =
      walletEtherBalance * ethMarketData.current_price;
    const walletAurusBalanceUSD =
      walletAurusBalance * aurusxMarketData.current_price;
    const walletPolytradeBalanceUSD =
      walletPolygonBalance * polytradeMarketData.current_price;

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
        changePercentage: aurusxMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletPolytradeBalanceUSD,
        changePercentage: polytradeMarketData.price_change_percentage_24h,
      },
    ];

    const portfolio24h = getTotal(wallet24hBalance);

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
      {
        balanceUSD: walletPolytradeBalanceUSD,
        changePercentage: polytradeMarketData.price_change_percentage_7d,
      },
    ];

    const portfolio7d = getTotal(wallet7dBalance);

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
      {
        balanceUSD: walletPolytradeBalanceUSD,
        changePercentage: polytradeMarketData.price_change_percentage_30d,
      },
    ];

    const portfolio30d = getTotal(wallet30dBalance);

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
      {
        balanceUSD: walletPolytradeBalanceUSD,
        changePercentage: polytradeMarketData.market_cap_change_percentage_24h,
      },
    ];

    const portfolioMarketCap24h = getTotal(wallet24hMarketCap);

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
    const walletCondoBalance = await getBaseBalance(condoABI, addressToCheck);
    const walletAirdropBalance = await getBaseBalance(
      condoABI,
      condoAirdropAddress
    );
    const walletEtherBalance = await getEtherBalance(addressToCheck);
    const walletAurusBalance = await getPolyBalance(25417);
    const walletPolygonBalance = await getPolygonBalance(
      polytradeABI,
      polytradeAddress
    );

    const condoMarketData = await getMarketData("condo");
    const ethMarketData = await getMarketData("ethereum");
    const aurusxMarketData = await getMarketData("aurusx");
    const polytradeMarketData = await getMarketData("polytrade");
    const walletCondoBalanceUSD =
      walletCondoBalance * condoMarketData.current_price;
    const walletAirdropBalanceUSD =
      walletAirdropBalance * condoMarketData.current_price;
    const walletEtherBalanceUSD =
      walletEtherBalance * ethMarketData.current_price;
    const walletAurusBalanceUSD =
      walletAurusBalance * aurusxMarketData.current_price;
    const walletPolytradeBalanceUSD =
      walletPolygonBalance * polytradeMarketData.current_price;

    const condoHistoricalPrice = await getHistoricalTokenPrice("condo");
    const historicalCondoBalance = walletValue(
      condoHistoricalPrice.prices,
      walletCondoBalanceUSD
    );

    const historicalAirdropBalance = walletValue(
      condoHistoricalPrice.prices,
      walletAirdropBalanceUSD
    );

    const etherHistoricalPrice = await getHistoricalTokenPrice("ethereum");
    const historicalEtherBalance = walletValue(
      etherHistoricalPrice.prices,
      walletEtherBalanceUSD
    );

    const aurusHistoricalPrice = await getHistoricalTokenPrice("aurusx");
    const historicalAurusBalance = walletValue(
      aurusHistoricalPrice.prices,
      walletAurusBalanceUSD
    );

    const polytradeHistoricalPrice = await getHistoricalTokenPrice("polytrade");
    const historicalPolytradeBalance = walletValue(
      polytradeHistoricalPrice.prices,
      walletPolytradeBalanceUSD
    );

    return res.status(200).json({
      status: true,
      portfolioHistorical: {
        historicalCondoBalance,
        historicalEtherBalance,
        historicalAurusBalance,
        historicalPolytradeBalance,
        historicalAirdropBalance:
          walletAirdropBalanceUSD <= 0 ? null : historicalAirdropBalance,
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

module.exports = {
  getPortfolioData,
  getPortfolioHistorical,
};
