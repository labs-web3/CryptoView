import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Transactions", TransactionsSchema);
