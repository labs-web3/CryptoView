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

// Méthode createHash : hache le mot de passe fourni en utilisant l'algorithme argon2d.
// @param password - Le mot de passe en clair à hacher.
// @returns - Le mot de passe haché ou null en cas d'erreur.
UserSchema.methods.createHash = async function (password) {
  try {
    const hash = await argon2.hash(password, { type: argon2.argon2d });
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

UserSchema.methods.verifyPassword = async function (password) {
  try {
    const isCorrect = await argon2.verify(this.password, password);
    return isCorrect;
  } catch (error) {
    console.log("error verifying password : ", error);
    return false;
  }
};

export default mongoose.model("User", UserSchema);
