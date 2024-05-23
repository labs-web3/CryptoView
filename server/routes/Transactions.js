import express from "express";
import {
  createTransaction,
  getTransaction,
} from "../controllers/transactionsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createTransaction);

router.get("/", getTransaction);

export default router;
