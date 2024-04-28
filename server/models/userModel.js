import mongoose from "mongoose";
import argon2 from "argon2";
import validator from "validator";

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

UserSchema.methods.valid = async function (email, password) {
  try {
    if (!email || !password) {
      throw Error("All field must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw Error("Password not strong enough");
    }
  } catch (error) {
    console.log("isValid : ", error);
  }
};

export default mongoose.model("User", UserSchema);
