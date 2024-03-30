import express from "express";
import { newUser } from "../controllers/user.js";

const userRouter = express();

// route- /api/v1/user/new
userRouter.post("/new", newUser);

export default userRouter;
