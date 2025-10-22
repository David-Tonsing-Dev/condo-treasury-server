const { ethers } = require("ethers");
const axios = require("axios");
const dotenv = require("dotenv");
const TreasuryToken = require("../models/condoTreasuryTokenModel");

const {
  condoABI,
  mapleABI,
  brickkenABI,
  eth2xABI,
  polytradeABI,
  usdcABI,
} = require("../utils/constants/abis");

dotenv.config();

// Addresses
const addressToCheck = "0x6404B20B5a8493c426b6efBE52809B206b26d393";
const condoPolygonTreasury = "0x4bF52ff02cc24ecD3d0e8E104f178647893Bd310";
const baseWalletAddress = "0x30D19Fb77C3Ee5cFa97f73D72c6A1E509fa06AEf";
const syrupContract = "0x643C4E15d7d62Ad0aBeC4a9BD4b001aA3Ef52d66";
const brickkenContract = "0x0e28bC9B03971E95acF9ae1326E51ecF9C55B498";
const indexCoopContract = "0xC884646E6C88d9b172a23051b38B0732Cc3E35a6";
const devAddress = "0xEf3E49a3197417ccDbF5F6A60D89f7Fa4823199d";
const devCondoContract = "0x30D19Fb77C3Ee5cFa97f73D72c6A1E509fa06AEf";
const aurusXContractAddress = "0x1a763170B96F23f15576D0fa0b2619d1254c437d";
const polytradeContractAddress = "0x692AC1e363ae34b6B489148152b12e2785a3d8d6";
const usdcContractAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const baseUrl = process.env.ALCHEMY_BASE_URL;
const ethUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`;
const bnbUrl = `https://bnb-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`;
const polyUrl = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`;

const AurusXBalance = 25417;
const formatEther = ethers.utils.formatEther;

const fetchMarketPrice = async (coinId) => {
  try {
    const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      headers: {
        "x-cg-pro-api-key": process.env.COINGECKO_KEY,
      },
    };
    const resp = await axios.get(url, options);
    const data = resp.data;

    if (!data) {
      throw new Error(
        `Invalid response from CoinGecko or delisted token: ${coinId}`
      );
    }

    return data;
  } catch (err) {
    console.warn(`Skipped token "${coinId}" due to error:`, err.message);
    return null;
  }
};

const fetchIndexCoopPrice = async () => {
  try {
    const resp = await axios.get(
      "https://api.indexcoop.com/data/tokens/0xc884646e6c88d9b172a23051b38b0732cc3e35a6?metrics=nav"
    );
    if (Array.isArray(resp.data) && resp.data.length > 0) {
      return resp.data[0].NetAssetValue;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch INDEX token price:", err.message);
  }
};

async function upsertToken({
  tokenId,
  tokenName,
  tokenImg,
  symbol,
  chain,
  tokenBalance,
  tokenAddress,
  balanceUsd,
}) {
  const existing = await TreasuryToken.findOne({ tokenId });
  if (existing) {
    existing.tokenBalance = tokenBalance;
    existing.balanceUsd = balanceUsd;
    existing.tokenImg = tokenImg;
    existing.active = true;
    await existing.save();
  } else {
    await TreasuryToken.create({
      tokenId,
      tokenName,
      tokenImg,
      symbol,
      chain,
      tokenBalance,
      tokenAddress,
      balanceUsd,
    });
  }
}

const getBalance = async (
  provider,
  contractAddress,
  abi,
  holder,
  decimals = 18
) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const raw = await contract.balanceOf(holder);
    return ethers.utils.formatUnits(raw.toString(), decimals);
  } catch (error) {
    console.warn(`Skipping balance for ${contractAddress} - ${error.message}`);
    return null;
  }
};

const processToken = async ({
  tokenId,
  provider,
  contract,
  abi,
  holder = addressToCheck,
  decimals = 18,
  hardcodedBalance = null,
}) => {
  const balance =
    hardcodedBalance ??
    (await getBalance(provider, contract, abi, holder, decimals));
  if (balance == null) {
    console.warn(`Skipping ${tokenId}: balance fetch failed.`);
    return;
  }

  const details = await fetchMarketPrice(tokenId);
  if (details) {
    await upsertToken({
      tokenId: details.id,
      tokenName: details.name,
      tokenImg: details.image.large,
      symbol: details.symbol,
      chain: details.asset_platform_id,
      tokenBalance: balance,
      tokenAddress: "",
      balanceUsd: details.market_data?.current_price?.usd
        ? balance * details.market_data.current_price.usd
        : null,
    });
  } else {
    await TreasuryToken.findOneAndUpdate(
      { tokenId },
      {
        $set: {
          tokenBalance: balance,
          balanceUsd: null,
          active: false,
        },
      },
      { upsert: true, new: true }
    );
  }
};

const fetchTreasuryToken = async () => {
  const providerBase = new ethers.providers.JsonRpcProvider(baseUrl);
  const providerEth = new ethers.providers.JsonRpcProvider(ethUrl);
  const providerBnb = new ethers.providers.JsonRpcProvider(bnbUrl);
  const providerPoly = new ethers.providers.JsonRpcProvider(polyUrl);

  await processToken({
    tokenId: "condo",
    provider: providerBase,
    contract: baseWalletAddress,
    abi: condoABI,
  });

  await processToken({
    tokenId: "syrup",
    provider: providerEth,
    contract: syrupContract,
    abi: mapleABI,
  });

  await processToken({
    tokenId: "brickken",
    provider: providerBnb,
    contract: brickkenContract,
    abi: brickkenABI,
  });

  await processToken({
    tokenId: "polytrade",
    provider: providerPoly,
    contract: polytradeContractAddress,
    abi: polytradeABI,
    holder: condoPolygonTreasury,
  });

  await processToken({
    tokenId: "usd-coin",
    provider: providerBase,
    contract: usdcContractAddress,
    abi: usdcABI,
    decimals: 6,
  });

  try {
    const ethRaw = await providerBase.getBalance(addressToCheck);
    const ethBalance = formatEther(ethRaw.toString());
    await processToken({
      tokenId: "ethereum",
      hardcodedBalance: ethBalance,
    });
  } catch (err) {
    console.warn("Skipping ethereum balance:", err.message);
  }

  // Index Coop
  const indexBalance = await getBalance(
    providerBase,
    indexCoopContract,
    eth2xABI,
    addressToCheck
  );
  if (indexBalance != null) {
    const indexUsd = await fetchIndexCoopPrice();
    await upsertToken({
      tokenId: "index-coop-ethereum-2x-index",
      tokenName: "Index Coop Ethereum 2x Index",
      tokenImg:
        "https://res.cloudinary.com/dbtsrjssc/image/upload/v1749892058/97f6e4e525d31caad57194baf68ae5a729051273021c0cd972d8ae75b1f64f19_1_rfqlc8.png",
      symbol: "ETH2X",
      chain: "",
      tokenBalance: indexBalance,
      tokenAddress: "",
      balanceUsd: indexUsd ? indexBalance * indexUsd : null,
    });
  } else {
    console.warn("Skipping index coop: balance fetch failed.");
  }

  await processToken({
    tokenId: "aurusx",
    hardcodedBalance: AurusXBalance,
  });

  console.log("Token balances fetched and saved to DB.");
};

module.exports = {
  fetchTreasuryToken,
};
