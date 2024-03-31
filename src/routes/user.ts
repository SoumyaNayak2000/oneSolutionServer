import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.js";
import { isAdmin } from "../middlewares/auth.js";

const app = express();

// route- /api/v1/user/new
app.post("/new", newUser);

// Route - /api/v1/user/all
app.get("/all", isAdmin, getAllUsers);

// Route - /api/v1/user/dynamicId
app.route("/:id").get(getUser).delete(isAdmin, deleteUser);

export default app;
