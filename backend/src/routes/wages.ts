import express from "express";
import {
  getWages,
  postWages,
  getWagesRequests,
  postWagesRequests,
} from "../controllers/wages";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/wages", authMiddleware, getWages);
router.post("/wages", postWages);
router.get("/wages/access", getWagesRequests);
router.post("/wages/access", authMiddleware, postWagesRequests);

export default router;
