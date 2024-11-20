import mongoose from "mongoose";

//import { env } from "@/env/server.mjs";

export default async function connectDB() {
  try {
    console.log(process.env.MONGODB_URI, process.env.DATABASE_NAME);
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.DATABASE_NAME || "",
    });
    const connection = mongoose.connection;
    console.log("Connecting to Mongo!");
    connection.on("connected", () => {
      console.info("MongoDB is connected 🟢");
    });

    connection.on("error", (err) => {
      console.error("MongoDB is not connected 🔴 \n", err);
      process.exit();
    });
  } catch (err) {
    console.error("MongoDB is not connected 💫 \n", err);
  }
}
