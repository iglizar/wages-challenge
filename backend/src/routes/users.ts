import express from "express";
import { login, getBalance, getUsers } from "../controllers/users";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.get("/balance/", authMiddleware, getBalance);
router.get("/users", getUsers);

export default router;
