import jwt from "jsonwebtoken";
import process from "process";
import userModel from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ message: "Request is not authorized" });
  }
};

export default requireAuth;
