import express from "express";
import { sendNotification } from "../core/notifications.js";

const MINIMUM_INTERVAL = 10;
const DEFAULT_INTERVAL = 1000;

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("OK");
});

router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const intervalMs = parseInt(req.query.interval as string) || DEFAULT_INTERVAL;
  const validInterval = Math.max(intervalMs, MINIMUM_INTERVAL);

  const interval = setInterval(() => {
    res.write(`data: ${Math.random().toString(36).substring(2, 15)}\n\n`);
  }, validInterval);

  req.on("close", () => {
    clearInterval(interval);
  });
});

router.get("/notification", async (req, res) => {
  const {
    message: queryMessage,
    topic: queryTopic,
    priority: queryPriority,
  } = req.query;
  const message = (queryMessage as string) ?? "Notification is up and running";
  const topic = (queryTopic as string) ?? "main";
  const priority = (queryPriority as "urgent" | "default" | "low") ?? "default";
  await sendNotification({
    priority,
    message,
    topic,
  });
  res.send(JSON.stringify({ message, topic, priority }));
});

export default router;
