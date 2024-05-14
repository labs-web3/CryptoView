import PortfolioSchema from "../models/userPortfolioModel.js";
import mongoose from "mongoose";

// create a new line
const createPortfolio = async (req, res) => {
  const { id } = req.body;

  let emptyFields = [];

  if (!id) {
    emptyFields.push("id");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await PortfolioSchema.create({ id, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createPortfolio };
