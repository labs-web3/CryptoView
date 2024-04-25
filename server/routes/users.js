import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getUsers);

//GET a single user
router.get("/:id", getUser);

//POST a new user
router.post("/", createUser);

//DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

export default router;
