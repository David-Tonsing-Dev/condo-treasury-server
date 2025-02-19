require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { getAssociatedTokenAddress, getAccount } = require("@solana/spl-token");

const condoRoute = require("./routes/condoRoute");
const portfolioRoute = require("./routes/portfolioRoute");
const runCronJobs = require("./schedular/indexCoop");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/api/condo", condoRoute);
app.use("/api/portfolio", portfolioRoute);
// app.use("/api/alok/get/wallet-balance", async (req, res) => {
//   const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
//   const walletAddress = "ApbcbW9rqNaXcnLVt5gjUK4gNiMkG2cDuiDg9xEgJVTY";
//   const saiosAddress = "4vfcfjAz1tSA6tWe7cP6Lj7fR8y7VactzTKPxof7pump";
//   const walletPublicKey = new PublicKey(walletAddress);
//   const tokenMintPublicKey = new PublicKey(saiosAddress);
//   try {
//     const solBalance = await connection.getBalance(walletPublicKey);
//     const solBalanceInSOL = solBalance / 1e9;

//     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
//       walletPublicKey,
//       {
//         programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
//       }
//     );

//     const tokens = tokenAccounts.value.map((account) => {
//       const tokenInfo = account.account.data.parsed.info;
//       return {
//         mint: tokenInfo.mint,
//         amount: tokenInfo.tokenAmount.uiAmount,
//         decimals: tokenInfo.tokenAmount.decimals,
//       };
//     });

//     // Derive the associated token account address
//     const associatedTokenAddress = await getAssociatedTokenAddress(
//       tokenMintPublicKey,
//       walletPublicKey
//     );

//     // Fetch the account details
//     const tokenAccount = await getAccount(connection, associatedTokenAddress);

//     // Get the balance in the token's decimal units
//     const tokenBalance = Number(tokenAccount.amount) / 10 ** 6;

//     return res.json({
//       walletAddress,
//       saiosAddress,
//       tokenBalance,
//       sol: solBalanceInSOL,
//       tokens,
//     });
//   } catch (error) {
//     console.error("Error fetching token balance:", error);
//     throw new Error("Failed to fetch token balance.");
//   }
// });

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

app.get("/api/base/pool", async (req, res) => {
  try {
    const resp = await axios.get(
      `https://pro-api.coingecko.com/api/v3/onchain/networks/base/pools/0xef9bccfba3a62e0a50d288a3031ca18f41f6c000`,
      {
        headers: {
          "x-cg-pro-api-key": process.env.COINGECKO_KEY,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return res.status(200).json({ status: true, data: resp.data });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.get("/home", (req, res) => {
  res.render("pages/home");
});

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`);
  runCronJobs();
});
