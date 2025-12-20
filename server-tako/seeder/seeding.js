import dotenv from "dotenv";
import { closeDB, connectDB, getDB } from "../config/mongo.js";
import { posts, users } from "./user.js";

dotenv.config();

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // 1. Connect ke database
    await connectDB();
    const db = getDB();

    // 2. Bersihkan existing data (optional)
    await db.collection("users").deleteMany({});
    await db.collection("posts").deleteMany({});
    console.log("Cleared existing data.");

    // 3. Seed users
    const usersResult = await db.collection("users").insertMany(users);
    console.log(`Inserted ${usersResult.insertedCount} users.`);

    // 4. Ambil userIds untuk dihubungkan ke posts
    const userIds = await db.collection("users").find().toArray();

    // 5. Assign userId ke setiap post secara acak
    const postWithUserIds = posts.map((el, idx) => {
      const userIndex = idx % userIds.length;
      return {
        ...el,
        UserId: userIds[userIndex]._id,
      };
    });

    // 6. Seed posts
    const postsResult = await db
      .collection("posts")
      .insertMany(postWithUserIds);
    console.log(`Inserted ${postsResult.insertedCount} posts.`);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

seedDatabase();
