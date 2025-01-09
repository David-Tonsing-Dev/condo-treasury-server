const { Web3 } = require("web3");
const {
  condoContractAddress,
  polytradeContractAddress,
  mapleAddress,
  brickkenAddress,
} = require("./constants/addresses");

const polygonWeb3 = new Web3(
  `https://polygon-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`
);

const baseWeb3 = new Web3(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.RPC_KEY}`
);

const etherWeb3 = new Web3(
  `https://eth-mainnet.g.alchemy.com/v2/H1rJyGFx5Lny_Lu9ALavFSjD9fEpReZ4`
);

const bnbWeb3 = new Web3(
  `https://bnb-mainnet.g.alchemy.com/v2/H1rJyGFx5Lny_Lu9ALavFSjD9fEpReZ4`
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

const getBnBBalance = async (ABI, address) => {
  const contractAddress = new bnbWeb3.eth.Contract(ABI, brickkenAddress);
  const balance = await contractAddress.methods.balanceOf(address).call();
  return bnbWeb3.utils.fromWei(balance, "ether");
};

const getEtherTokenBalance = async (ABI, address) => {
  const contractAddress = new etherWeb3.eth.Contract(ABI, mapleAddress);
  const balance = await contractAddress.methods.balanceOf(address).call();
  return etherWeb3.utils.fromWei(balance, "ether");
};

module.exports = {
  getBaseBalance,
  getEtherBalance,
  getPolyBalance,
  getBaseTokenBalance,
  getPolygonBalance,
  getEtherTokenBalance,
  getBnBBalance,
};
