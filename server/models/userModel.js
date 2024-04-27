import mongoose from "mongoose";
import argon2 from "argon2";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createHash = async function (password) {
  try {
    const hash = await argon2.hash(password, { type: argon2.argon2d });
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

export default mongoose.model("User", UserSchema);
