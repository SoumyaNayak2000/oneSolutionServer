import express from "express";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import NodeCache from "node-cache";
import morgan from "morgan";

export const myCache = new NodeCache();

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

// importing routes
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";

// default route
app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

//using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

export { app };
