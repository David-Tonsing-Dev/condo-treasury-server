const get24hPrice = (balance, percent) => balance * (percent / 100);

const get7dPrice = (balance, percent) => balance * (percent / 100);

const get30dPrice = (balance, percent) => balance * (percent / 100);

const get24hMarketCap = (balance, percent) => balance * (percent / 100);

const getTotal = (balance, getPrice) =>
  balance.reduce(
    (total, { balanceUSD, changePercentage }) =>
      total + getPrice(balanceUSD, changePercentage),
    0
  );

module.exports = {
  get24hPrice,
  get7dPrice,
  get30dPrice,
  get24hMarketCap,
  getTotal,
};
