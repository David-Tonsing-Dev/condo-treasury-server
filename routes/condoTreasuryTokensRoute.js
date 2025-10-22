const express = require("express");
const {
  getAllTreasuryToken,
  getTreasuryChart,
} = require("../controllers/treasuryTokenController");
const router = express.Router();

router.get("/", getAllTreasuryToken);
router.get("/chart", getTreasuryChart);

module.exports = router;
