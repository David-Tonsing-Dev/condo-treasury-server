const getPriceFromPercent = (balance, percent) => balance * (percent / 100);

const getTotal = (balance) =>
  balance.reduce(
    (total, { balanceUSD, changePercentage }) =>
      total + getPriceFromPercent(balanceUSD, changePercentage),
    0
  );

module.exports = {
  getTotal,
};
