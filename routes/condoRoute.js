const express = require("express");

const {
  getCondoData,
  getCondoMarketData,
  getCondoOHLCChart,
  getCondoHistoricalChart,
} = require("../controllers/condoController");

const router = express.Router();

router.get("/", getCondoMarketData);
router.get("/data", getCondoData);
router.get("/ohlc/chart", getCondoOHLCChart);
router.get("/historical/chart", getCondoHistoricalChart);

module.exports = router;
