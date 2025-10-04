import { Router } from "express";
import { authMiddleware } from "../auth.js";

const router = Router();

router.get("/:key", authMiddleware, (req, res) => {
  const { key } = req.params;
  const secret = process.env[key];
  if (!secret) {
    return res.status(404).json({ error: "Secret not found" });
  }
  res.send(JSON.stringify({ secret }));
});

export default router;
