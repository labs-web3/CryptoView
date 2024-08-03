const fetch = require("node-fetch");
const Transaction = require("../models/transactionModel");
const dotenv = require("dotenv");

dotenv.config();
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";

const getTransaction = async (req, res) => {
  const { address, startDate, endDate } = req.query;

  try {
    const response = await fetch(
      `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== "1") {
      return res
        .status(500)
        .json({ error: "Failed to fetch data from Etherscan" });
    }

    let transactions = data.result;

    if (startDate && endDate) {
      transactions = transactions.filter((tx) => {
        const txDate = new Date(tx.timeStamp * 1000);
        return txDate >= new Date(startDate) && txDate <= new Date(endDate);
      });
    }

    transactions = transactions.slice(0, 5);
    for (const tx of transactions) {
      const transaction = new Transaction({
        address,
        txHash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value / 1e18,
        timestamp: new Date(tx.timeStamp * 1000),
      });

      try {
        await transaction.save();
      } catch (error) {
        console.error("Error saving transaction:", error);
      }
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching transactions" });
  }
};

module.exports = { getTransaction };
