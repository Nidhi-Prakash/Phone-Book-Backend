import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  loginUser,
} from "../controllers/usersController.js";
import { validateToken } from "../middleware/validateToken.js";

export const userRouter = Router();

userRouter.get("/", validateToken, getCurrentUser);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);
