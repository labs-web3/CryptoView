const { Web3 } = require("web3");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.ERC20_TESTNET_RPC_URL;

const web3 = new Web3(url);
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const getTokenBalance = async (req, res) => {
  const { contractAddress, walletAddress } = req.params;
console.log(contractAddress, walletAddress)
  try {
    const contract = new web3.eth.Contract(ERC20_ABI, contractAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const formattedBalance = web3.utils.fromWei(balance, "ether");

    res.status(200).json({ balance: formattedBalance });
  } catch (error) {
    console.error("Error fetching token balance:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching token balance" });
  }
};

module.exports = { getTokenBalance };
