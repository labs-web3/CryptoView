import express from "express";
import {
  createPortfolio,
  getUserPortfolio,
} from "../controllers/userPortfolioController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createPortfolio);

router.get("/", getUserPortfolio);

export default router;
