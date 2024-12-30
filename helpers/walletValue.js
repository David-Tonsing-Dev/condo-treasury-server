const walletValue = (pricesData, walletTokens) => {
  return pricesData.map(([timestamp, tokenPrice]) => {
    const walletValue = tokenPrice * walletTokens;
    return [timestamp, tokenPrice, walletValue];
  });
};

module.exports = { walletValue };
