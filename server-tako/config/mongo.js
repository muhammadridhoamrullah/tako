import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;

// Validasi URI
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri);
let db = null;

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Tes connection dengan ping
    await client.db("tako").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    db = client.db("tako");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    await client.close();
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

export { connectDB, getDB, closeDB };
