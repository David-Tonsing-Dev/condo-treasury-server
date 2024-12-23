require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const condoRoute = require("./routes/condoRoute");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/api/condo", condoRoute);

app.get("/", (req, res) => {
  res.render("pages/landing");
});

app.get("/ethereum", async (req, res) => {
  const resp = await axios.get(
    "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum",
    {
      headers: {
        "x-cg-pro-api-key": process.env.COINGECKO_KEY,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return res.status(200).json({
    success: true,
    ethereumDetail: resp.data[0],
  });
});

app.get("/aurusx", async (req, res) => {
  const resp = await axios.get(
    "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=aurusx",
    {
      headers: {
        "x-cg-pro-api-key": process.env.COINGECKO_KEY,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return res.status(200).json({
    success: true,
    aurusxDetail: resp.data[0],
  });
});

app.get("/:coinid", async (req, res) => {
  const resp = await axios.get(
    `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.params.coinid}`,
    {
      headers: {
        "x-cg-pro-api-key": process.env.COINGECKO_KEY,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return res.status(200).json({ success: true, detail: resp.data[0] });
});

app.get("/home", (req, res) => {
  res.render("pages/home");
});

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`);
});
