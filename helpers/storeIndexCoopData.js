const { ethers } = require("ethers");
const IndexCoop = require("../models/indexCoopModel");
const { eth2xABI } = require("../utils/constants/abis");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const addressToCheck = "0x6404B20B5a8493c426b6efBE52809B206b26d393";
const indexCoopContract = "0xC884646E6C88d9b172a23051b38B0732Cc3E35a6";
const providerBase = new ethers.providers.JsonRpcProvider(
  process.env.ALCHEMY_BASE_URL
);
const formatEther = ethers.utils.formatEther;

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

const getBalance = async (provider, contractAddress, abi, holder) => {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const raw = await contract.balanceOf(holder);
  return formatEther(raw.toString());
};

const storeIndexCoopData = async () => {
  try {
    const indexCoopBalance = await getBalance(
      providerBase,
      indexCoopContract,
      eth2xABI,
      addressToCheck
    );
    const balance = parseFloat(indexCoopBalance);

    const price = await fetchIndexCoopPrice();

    const now = new Date();
    const timestamp = now.getTime();
    const balanceUsd = balance * price;

    const newData = new IndexCoop({
      tokenName: "index-coop-ethereum-2x-index",
      priceHistory: [
        {
          timestamp,
          price: balanceUsd,
        },
      ],
    });
    await newData.save();
    console.log(` Storing Index Coop price`);
  } catch (err) {
    console.error("Error storing Index Coop price:", err.message);
  }
};

module.exports = storeIndexCoopData;
