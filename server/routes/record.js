import express from "express";

const app = express();

app.get("/SignUp", (req, res) => {
  res.json({ message: "Welcome to the app" });
});
