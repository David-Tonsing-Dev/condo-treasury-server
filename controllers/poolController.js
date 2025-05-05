const getPoolDetail = async (req, res) => {
  try {
    const { address } = req.params;
    const resp = await axios.get(
      `https://pro-api.coingecko.com/api/v3/onchain/networks/base/pools/${address}`,
      {
        headers: {
          "x-cg-pro-api-key": process.env.COINGECKO_KEY,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return res.status(200).json({ status: true, detail: resp.data });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { getPoolDetail };
