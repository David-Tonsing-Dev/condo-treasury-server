const express = require("express");

const {
  getPortfolioData,
  getPortfolioHistorical,
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/data", getPortfolioData);
router.get("/historical/chart", getPortfolioHistorical);

module.exports = router;
