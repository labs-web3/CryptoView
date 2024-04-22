//Config express
import express from "express";
import dotenv from "dotenv";
import process from "process";
import workoutRoutes from "./routes/workouts.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);

// listen requests
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
