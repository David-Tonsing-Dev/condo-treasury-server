const axios = require("axios");

const COINGECKO_URL = "https://pro-api.coingecko.com/api/v3";
const options = {
  headers: {
    "x-cg-pro-api-key": process.env.COINGECKO_KEY,
    "Access-Control-Allow-Origin": "*",
  },
};

const getCondoData = async (req, res) => {
  try {
    const resp = await axios(
      `${COINGECKO_URL}/coins/condo?market_data=true&community_data=false&developer_data=false`,
      options
    );

    const market_data = resp.data.market_data;

    const data = {
      price_change_24h: market_data.price_change_24h,
      price_change_percentage_24h: market_data.price_change_percentage_24h,
      price_change_percentage_7d: market_data.price_change_percentage_7d,
      price_change_percentage_14d: market_data.price_change_percentage_14d,
      price_change_percentage_30d: market_data.price_change_percentage_30d,
      price_change_percentage_60d: market_data.price_change_percentage_60d,
      price_change_percentage_200d: market_data.price_change_percentage_200d,
      price_change_percentage_1y: market_data.price_change_percentage_1y,
      market_cap_change_24h: market_data.market_cap_change_24h,
      market_cap_change_percentage_24h:
        market_data.market_cap_change_percentage_24h,
    };

    return res.status(200).json({ status: true, condoData: data });
  } catch (err) {
    console.log("ERROR::", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const getCondoMarketData = async (req, res) => {
  try {
    const resp = await axios.get(
      `${COINGECKO_URL}/coins/markets?vs_currency=usd&ids=condo`,
      options
    );

    return res.status(200).json({
      success: true,
      condoDetail: resp.data[0],
    });
  } catch (err) {
    console.log("ERR", err.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getCondoOHLCChart = async (req, res) => {
  const { days = "7", interval = "hourly" } = req.query;
  try {
    const resp = await axios.get(
      `${COINGECKO_URL}/coins/condo/ohlc?vs_currency=usd&days=${days}&interval=${interval}`,
      options
    );

    return res.status(200).json({ status: true, condoOHLC: resp.data });
  } catch (err) {
    console.log("ERROR::", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const getCondoHistoricalChart = async (req, res) => {
  try {
    const resp = await axios.get(
      `${COINGECKO_URL}/coins/condo/market_chart?vs_currency=usd&days=1`,
      options
    );

    return res.status(200).json({ status: true, condoHistorical: resp.data });
  } catch (err) {
    console.log("ERROR::", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const getLiquidityPool = async (req, res) => {
  try {
    const resp = await axios.get(
      `${COINGECKO_URL}/onchain/networks/base/pools/0xef9bccfba3a62e0a50d288a3031ca18f41f6c000?include=0x30d19fb77c3ee5cfa97f73d72c6a1e509fa06aef`,
      {
        headers: {
          "x-cg-pro-api-key": process.env.COINGECKO_KEY,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return res.status(200).json({
      success: true,
      liquidityPool: resp.data.data.attributes.reserve_in_usd,
    });
  } catch (err) {
    console.log("ERROR::", err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

module.exports = {
  getCondoData,
  getCondoMarketData,
  getCondoOHLCChart,
  getCondoHistoricalChart,
  getLiquidityPool,
};
