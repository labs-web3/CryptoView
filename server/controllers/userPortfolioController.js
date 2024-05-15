import PortfolioSchema from "../models/userPortfolioModel.js";
import mongoose from "mongoose";

const createPortfolio = async (req, res) => {
  const { id } = req.body;

  const user_id = req.user_id;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!id) {
    return res
      .status(400)
      .json({ error: "Please provide an ID for the portfolio" });
  }

  try {
    // Créer le portfolio avec les informations fournies
    const portfolio = await PortfolioSchema.create({ id, user_id });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createPortfolio };
