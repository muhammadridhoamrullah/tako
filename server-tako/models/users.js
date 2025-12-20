import { hashPassword } from "../helpers/bcrypt.js";

export class User {
  static async getAll(db) {
    return await db.collection("users").find().toArray();
  }

  static async register(db, userData) {
    const { name, email, password } = userData;

    // Validasi sederhana
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    // Cek apakah email sudah terdaftar
    const checkEmail = await db.collection("users").findOne({ email });

    if (checkEmail) {
      throw new Error("Email already registered");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const newUser = {
      name,
      email,
      password: hashPassword(password),
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    if (!result.acknowledged) {
      throw new Error("Failed to register user");
    }

    return {
      message: "User registered successfully",
    };
  }
}
