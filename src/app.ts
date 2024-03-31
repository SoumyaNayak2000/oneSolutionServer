import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

// importing routes
import userRouter from "./routes/user.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";

// default route
app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

//using routes
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

export { app };
