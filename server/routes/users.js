import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Login a user
router.post("/login", loginUser);

// GET all users
router.get("/", getUsers);

//GET a single user
router.get("/:id", getUser);

//POST a new user
router.post("/signup", createUser);

//DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

export default router;
