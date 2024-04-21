import express from "express";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
