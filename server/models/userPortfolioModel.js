import mongoose from "mongoose";
const { Schema } = mongoose;

const PortfolioSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    transaction: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", PortfolioSchema);
