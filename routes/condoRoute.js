const express = require("express");

const {
  getCondoData,
  getCondoMarketData,
  getCondoOHLCChart,
  getCondoHistoricalChart,
  getLiquidityPool,
} = require("../controllers/condoController");

const router = express.Router();

router.get("/", getCondoMarketData);
router.get("/data", getCondoData);
router.get("/ohlc/chart", getCondoOHLCChart);
router.get("/historical/chart", getCondoHistoricalChart);
router.get("/liquidityPool", getLiquidityPool);

module.exports = router;
