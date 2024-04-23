import express from "express";
import workoutModel from "../models/workoutModel.js";

const router = express.Router();

// GET all workouts
router.get("/", (req, res) => {
  res.json({ message: "GET all workouts" });
});

//GET a single workout
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single workout" });
});

//POST a new workout
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a workout" });
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a workout" });
});

export default router;
