//Config express
import express from "express";
import dotenv from "dotenv";
import process from "process";
import workoutRoutes from "./routes/workouts.js";
import mongoose from "mongoose";

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

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
