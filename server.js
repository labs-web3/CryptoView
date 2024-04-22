//Config express
import express from "express";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

// listen requests
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
