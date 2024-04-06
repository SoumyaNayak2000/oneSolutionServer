import { config } from "dotenv";
import { app } from "./app.js";
import connectDB from "./utils/db.js";

config({
  path: "./.env",
});

const PORT = process.env.PORT || 8081;
const MONGO_URI = process.env.MONGO_URI || "";

try {
  app.listen(PORT, () => {
    console.log(`Express is working on http://localhost:${PORT}`);
    connectDB(MONGO_URI);
  });
} catch (error) {
  console.log("Mongo db connection lost");
}
