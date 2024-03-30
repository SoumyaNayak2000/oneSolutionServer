import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

import { app } from "./app.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8081;
// const MONGO_URI = process.env.MONGO_URI || "";

try {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Express is working on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("Mongo db connection lost");
}
