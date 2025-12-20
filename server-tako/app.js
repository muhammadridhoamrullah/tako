import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { closeDB, connectDB, getDB } from "./config/mongo.js";
import { userResolvers, userTypeDefs } from "./schema/userSchema.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  introspection: true,
});

async function startServer() {
  try {
    // 1. Connect ke database
    await connectDB();

    // 2. Dapatkan instance database, biar bisa dikirim ke resolver nanti
    const db = getDB();

    // 3. Setup Apollo Server
    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
      context: async (req) => ({
        db,
      }),
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

// Graceful shutdown - tutup koneksi saat CTRL+C
process.on("SIGINT", async () => {
  console.log("\n⏳ Shutting down.. .");
  await closeDB();
  process.exit(0);
});

// Start server
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
