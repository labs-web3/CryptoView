import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createTransaction);

router.get("/", getTransactions);

export default router;
