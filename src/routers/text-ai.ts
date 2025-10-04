import { openrouter } from "@openrouter/ai-sdk-provider";
import { Router } from "express";
import { authMiddleware } from "../auth.js";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  return res.send(JSON.stringify({ message: "Not implemented" }));
});

export default router;
