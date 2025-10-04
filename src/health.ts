import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("OK");
});

router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const interval = setInterval(() => {
    res.write(`data: ${Math.random().toString(36).substring(2, 15)}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
  });
});
export default router;
