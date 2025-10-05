import { Router } from "express";
import { authMiddleware } from "../auth.js";
import { failure, success } from "../core/index.js";
import { get, set, del, list } from "../core/kv.js";
const router = Router();

router.get("/:key", authMiddleware, async (req, res) => {
  const { key } = req.params;
  const value = await get(key);
  if (value === null) {
    return res.status(404).json(failure("Key not found"));
  }
  res.send(JSON.stringify(success(value)));
});

router.delete("/:key", authMiddleware, async (req, res) => {
  const { key } = req.params;
  const deleted = await del(key);
  if (!deleted) {
    return res.status(404).json(failure("Key not found"));
  }
  res.send(JSON.stringify(success(null)));
});

router.get("/", authMiddleware, async (req, res) => {
  const entries = await list();
  res.send(JSON.stringify(success(entries)));
});

router.post("/", authMiddleware, async (req, res) => {
  const { key, value } = req.body;
  const result = await set(key, value);
  res.send(JSON.stringify(success(result)));
});

export default router;
