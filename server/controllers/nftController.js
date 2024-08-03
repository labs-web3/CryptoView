const NFT = require("../models/nftModel");
const fetch = require("node-fetch");
const { Web3 } = require("web3");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.ERC20_TESTNET_RPC_URL;
const web3 = new Web3(url);

const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: "_tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const getNFTMetaData = async (req, res) => {
  const { contractAddress, tokenId } = req.params;

  try {
    const tokenIdNumber = Number(tokenId);
    const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
    const tokenURI = await contract.methods.tokenURI(tokenIdNumber).call();

    const metaDataResponse = await fetch(tokenURI);
    const metaData = await metaDataResponse.json();

    const { name, description, image } = metaData;

    const nft = new NFT({
      contractAddress,
      tokenId,
      name,
      description,
      imageUrl: image,
    });

    await nft.save();

    res.status(200).json({ name, description, imageUrl: image });
  } catch (error) {
    console.error("Error fetching NFT meta data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching NFT meta data" });
  }
};

module.exports = { getNFTMetaData };
