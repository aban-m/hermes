import { Router } from "express";
import { authMiddleware } from "../auth.js";
import sql from "../database/index.js";
import { failure, success } from "../core/index.js";
const router = Router();

router.get("/:key", authMiddleware, async (req, res) => {
  const { key } = req.params;
  const value = await sql.query(`SELECT value FROM kv WHERE key = $1`, [key]);
  if (value.rows.length === 0) {
    return res.status(404).json(failure("Key not found"));
  }
  res.send(JSON.stringify(success(value.rows[0].value)));
});

router.post("/", authMiddleware, async (req, res) => {
  const { key, value } = req.body;
  await sql.query(
    `INSERT INTO kv (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
    [key, value]
  );
  res.send(JSON.stringify(success(value)));
});

export default router;
