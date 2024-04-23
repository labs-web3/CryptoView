import express from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a workout" });
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a workout" });
});

export default router;
