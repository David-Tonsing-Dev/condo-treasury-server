const axios = require("axios");

const COINGECKO_URL = "https://pro-api.coingecko.com/api/v3";
const options = {
  headers: {
    "x-cg-pro-api-key": process.env.COINGECKO_KEY,
    "Access-Control-Allow-Origin": "*",
  },
};

const getMarketData = async (token) => {
  const resp = await axios(
    `${COINGECKO_URL}/coins/${token}?market_data=true&community_data=false&developer_data=false`,
    options
  );

  const marketData = resp.data.market_data;

  return {
    current_price: marketData.current_price.usd,
    price_change_percentage_24h: marketData.price_change_percentage_24h,
    price_change_percentage_7d: marketData.price_change_percentage_7d,
    price_change_percentage_14d: marketData.price_change_percentage_14d,
    price_change_percentage_30d: marketData.price_change_percentage_30d,
    market_cap_change_percentage_24h:
      marketData.market_cap_change_percentage_24h,
  };
};

const getHistoricalTokenPrice = async (token) => {
  const resp = await axios.get(
    `${COINGECKO_URL}/coins/${token}/market_chart?vs_currency=usd&days=1`,
    options
  );

  return resp.data;
};

const fetchTokenHistoricalPrice = async (tokens) => {
  try {
    const promises = tokens.map((token) =>
      axios.get(
        `${COINGECKO_URL}/coins/${token}/market_chart?vs_currency=usd&days=1`,
        options
      )
    );

    const responses = await Promise.all(promises);

    const timestampData = responses[0].data.prices.map(
      ([timestamp, _]) => timestamp
    );

    const alignedData = tokens.map((token, index) => {
      const prices = responses[index].data.prices;
      const tokenData = prices.map(([timestamp, price]) => {
        const closestTimestamp = timestampData.find(
          (t) => Math.abs(t - timestamp) < 60000
        );
        return {
          x: closestTimestamp,
          y: closestTimestamp ? price : null,
        };
      });

      return {
        name: token,
        data: tokenData,
      };
    });
    return alignedData;
  } catch (error) {
    console.error("Error fetching token data:", error.message);
    throw error;
  }
};

module.exports = {
  getMarketData,
  getHistoricalTokenPrice,
  fetchTokenHistoricalPrice,
};
