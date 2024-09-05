require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("pages/landing");
});

app.get("/condo", async (req, res) => {
  const resp = await axios({
    url: "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=condo",

    method: "get",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_KEY,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return res.status(200).json({
    success: true,
    condoDetail: resp.data.data.CONDO[0],
  });
});

app.get("/home", (req, res) => {
  res.render("pages/home");
});

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`);
});
