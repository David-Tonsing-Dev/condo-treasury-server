const express = require("express");
const { getPoolDetail } = require("../controllers/poolController");
const router = express.Router();

router.get("/base/:address", getPoolDetail);

module.exports = router;
