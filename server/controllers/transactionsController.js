import TransactionsSchema from "../models/transactionsModel.js";
import mongoose from "mongoose";

const createTransaction = async (req, res) => {
  const { id } = req.body;

  const user_id = req.user._id;

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
    const portfolio = await TransactionsSchema.create({ id, user_id });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    // 1. Identifier l'utilisateur connecté
    const userId = req.user.id;

    // 2. Utiliser l'identifiant de l'utilisateur pour filtrer les données
    const userFolio = await TransactionsSchema.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(userFolio);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération du portfolio de l'utilisateur.",
    });
  }
};

export { createTransaction, getTransactions };
