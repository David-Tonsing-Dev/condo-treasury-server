const {
  getBaseBalance,
  getEtherBalance,
  getPolyBalance,
  getBaseTokenBalance,
  getPolygonBalance,
  getEtherTokenBalance,
  getBnBBalance,
  fetchBaseBalance,
} = require("../utils/constract");
const {
  getMarketData,
  getHistoricalTokenPrice,
  fetchTokenHistoricalPrice,
} = require("../utils/urls");
const { getTotal } = require("../helpers/priceChange");
const {
  condoABI,
  polytradeABI,
  mapleABI,
  brickkenABI,
  eth2xABI,
} = require("../utils/constants/abis");
const {
  addressToCheck,
  condoAirdropAddress,
  polytradeAddress,
  mapleAddress,
  brickkenAddress,
  eth2xAddress,
} = require("../utils/constants/addresses");
const { walletValue } = require("../helpers/walletValue");

const getPortfolioData = async (req, res) => {
  try {
    const walletCondoBalance = await getBaseBalance(condoABI, addressToCheck);
    const walletAirdropBalance = await getBaseBalance(
      condoABI,
      condoAirdropAddress
    );
    const walletEth2xBalance = await fetchBaseBalance(
      eth2xABI,
      addressToCheck,
      eth2xAddress
    );
    const walletEtherBalance = await getEtherBalance(addressToCheck);
    const walletBrickkenBalance = await getBnBBalance(
      brickkenABI,
      addressToCheck
    );
    const walletMapleBalance = await getEtherTokenBalance(
      mapleABI,
      addressToCheck
    );
    const walletAurusBalance = await getPolyBalance(25417);

    const walletPolygonBalance = await getPolygonBalance(
      polytradeABI,
      polytradeAddress
    );

    const condoMarketData = await getMarketData("condo");
    const ethMarketData = await getMarketData("ethereum");
    const aurusxMarketData = await getMarketData("aurusx");
    const polytradeMarketData = await getMarketData("polytrade");
    const mapleMarketData = await getMarketData("maple");
    const brickkenMarketData = await getMarketData("brickken");
    const eth2xMarketData = await getMarketData("index-coop-ethereum-2x-index");

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
    const walletMapleBalanceUSD =
      walletMapleBalance * mapleMarketData.current_price;
    const walletBrickkenBalanceUSD =
      walletBrickkenBalance * brickkenMarketData.current_price;
    const walletEth2xBalanceUSD =
      walletEth2xBalance * eth2xMarketData.current_price;

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
      {
        balanceUSD: walletMapleBalanceUSD,
        changePercentage: mapleMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletBrickkenBalanceUSD,
        changePercentage: brickkenMarketData.price_change_percentage_24h,
      },
      {
        balanceUSD: walletEth2xBalanceUSD,
        changePercentage: eth2xMarketData.price_change_percentage_24h,
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
      {
        balanceUSD: walletMapleBalanceUSD,
        changePercentage: mapleMarketData.price_change_percentage_7d,
      },
      {
        balanceUSD: walletBrickkenBalanceUSD,
        changePercentage: brickkenMarketData.price_change_percentage_7d,
      },
      {
        balanceUSD: walletEth2xBalanceUSD,
        changePercentage: eth2xMarketData.price_change_percentage_7d,
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
      {
        balanceUSD: walletMapleBalanceUSD,
        changePercentage: mapleMarketData.price_change_percentage_30d,
      },
      {
        balanceUSD: walletBrickkenBalanceUSD,
        changePercentage: brickkenMarketData.price_change_percentage_30d,
      },
      {
        balanceUSD: walletEth2xBalanceUSD,
        changePercentage: eth2xMarketData.price_change_percentage_30d,
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
      {
        balanceUSD: walletMapleBalanceUSD,
        changePercentage: mapleMarketData.market_cap_change_percentage_24h,
      },
      {
        balanceUSD: walletBrickkenBalanceUSD,
        changePercentage: brickkenMarketData.market_cap_change_percentage_24h,
      },
      {
        balanceUSD: walletEth2xBalanceUSD,
        changePercentage: eth2xMarketData.market_cap_change_percentage_24h,
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
    const walletEth2xBalance = await fetchBaseBalance(
      eth2xABI,
      addressToCheck,
      eth2xAddress
    );
    const walletEtherBalance = await getEtherBalance(addressToCheck);
    const walletAurusBalance = await getPolyBalance(25417);
    const walletPolygonBalance = await getPolygonBalance(
      polytradeABI,
      polytradeAddress
    );
    const walletBrickkenBalance = await getBnBBalance(
      brickkenABI,
      addressToCheck
    );
    const walletMapleBalance = await getEtherTokenBalance(
      mapleABI,
      addressToCheck
    );

    const condoMarketData = await getMarketData("condo");
    // const ethMarketData = await getMarketData("ethereum");
    // const aurusxMarketData = await getMarketData("aurusx");
    // const polytradeMarketData = await getMarketData("polytrade");
    // const walletCondoBalanceUSD =
    //   walletCondoBalance * condoMarketData.current_price;
    const walletAirdropBalanceUSD =
      walletAirdropBalance * condoMarketData.current_price;
    // const walletEtherBalanceUSD =
    //   walletEtherBalance * ethMarketData.current_price;
    // const walletAurusBalanceUSD =
    //   walletAurusBalance * aurusxMarketData.current_price;
    // const walletPolytradeBalanceUSD =
    //   walletPolygonBalance * polytradeMarketData.current_price;

    const condoHistoricalPrice = await getHistoricalTokenPrice("condo");
    const historicalCondoBalance = walletValue(
      condoHistoricalPrice.prices,
      walletCondoBalance
    );

    const historicalAirdropBalance = walletValue(
      condoHistoricalPrice.prices,
      walletAirdropBalance
    );

    const etherHistoricalPrice = await getHistoricalTokenPrice("ethereum");
    const historicalEtherBalance = walletValue(
      etherHistoricalPrice.prices,
      walletEtherBalance
    );

    const aurusHistoricalPrice = await getHistoricalTokenPrice("aurusx");
    const historicalAurusBalance = walletValue(
      aurusHistoricalPrice.prices,
      walletAurusBalance
    );

    const polytradeHistoricalPrice = await getHistoricalTokenPrice("polytrade");
    const historicalPolytradeBalance = walletValue(
      polytradeHistoricalPrice.prices,
      walletPolygonBalance
    );

    const brickkenHistoricalPrice = await getHistoricalTokenPrice("brickken");
    const brickkenPolytradeBalance = walletValue(
      brickkenHistoricalPrice.prices,
      walletBrickkenBalance
    );

    const mapleHistoricalPrice = await getHistoricalTokenPrice("maple");
    const maplePolytradeBalance = walletValue(
      mapleHistoricalPrice.prices,
      walletMapleBalance
    );

    const eth2xHistoricalPrice = await getHistoricalTokenPrice(
      "index-coop-ethereum-2x-index"
    );
    const histocialEth2xBalance = walletValue(
      eth2xHistoricalPrice.prices,
      walletEth2xBalance
    );

    const datasets = {
      condo: historicalCondoBalance,
      ether: historicalEtherBalance,
      aurus: historicalAurusBalance,
      polytrade: historicalPolytradeBalance,
      maple: maplePolytradeBalance,
      brickken: brickkenPolytradeBalance,
      eth2x: histocialEth2xBalance,
    };

    const shortestDataset = Object.values(datasets).reduce(
      (shortest, current) =>
        current.length < shortest.length ? current : shortest
    );

    const timestamps = shortestDataset.map((row) => row[0]);

    const alignedDatasets = Object.fromEntries(
      Object.entries(datasets).map(([key, data]) => [
        key,
        timestamps.map((timestamp, index) => {
          const row = data[index] || [];
          return [timestamp, ...row.slice(1)];
        }),
      ])
    );

    return res.status(200).json({
      status: true,
      portfolioHistorical: {
        historicalCondoBalance: alignedDatasets.condo,
        historicalEtherBalance: alignedDatasets.ether,
        historicalAurusBalance: alignedDatasets.aurus,
        historicalPolytradeBalance: alignedDatasets.polytrade,
        historicalMapleBalance: alignedDatasets.maple,
        historicalBrickkenBalance: alignedDatasets.brickken,
        histocialEth2xBalance: alignedDatasets.eth2x,
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
