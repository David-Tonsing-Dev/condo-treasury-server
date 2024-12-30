const { Web3 } = require("web3");
const {
  condoContractAddress,
  polytradeContractAddress,
} = require("./constants/addresses");

const polygonWeb3 = new Web3(
  `https://polygon-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`
);

const baseWeb3 = new Web3(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`
);

const getBaseBalance = async (ABI, address) => {
  const contractAddress = new baseWeb3.eth.Contract(ABI, condoContractAddress);
  const balance = await contractAddress.methods.balanceOf(address).call();
  return baseWeb3.utils.fromWei(balance, "ether");
};

const getEtherBalance = async (address) => {
  const balance = await baseWeb3.eth.getBalance(address);
  return baseWeb3.utils.fromWei(balance, "ether");
};

const getPolygonBalance = async (ABI, address) => {
  const contractAddress = new polygonWeb3.eth.Contract(
    ABI,
    polytradeContractAddress
  );
  const balance = await contractAddress.methods.balanceOf(address).call();
  return polygonWeb3.utils.fromWei(balance, "ether");
};

const getPolyBalance = async (balance) => {
  return polygonWeb3.utils.fromWei(balance, "ether");
};

const getBaseTokenBalance = async (ABI, address) => {
  const contractAddress = new baseWeb3.eth.Contract(ABI, condoContractAddress);
  const balance = await contractAddress.methods.balanceOf(address).call();
  return balance;
};

module.exports = {
  getBaseBalance,
  getEtherBalance,
  getPolyBalance,
  getBaseTokenBalance,
  getPolygonBalance,
};
