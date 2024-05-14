import express from "express";
import { createPortfolio } from "../controllers/userPortfolioController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createPortfolio);

export default router;
