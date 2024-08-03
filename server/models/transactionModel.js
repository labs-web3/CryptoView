const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: uuidv4 },
  address: String,
  txHash: { type: String, unique: false },
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  timestamp: Date,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
