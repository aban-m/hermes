import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import healthRouter from "./routers/health.js";
import secretsRouter from "./routers/secrets.js";
import textAiRouter from "./routers/text-ai.js";
import hermesRouter from "./routers/bots/hermes.js";
import kvRouter from "./routers/kv.js";
import cors from "cors";
import cronRouter from "./routers/cron.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({ greatest: "thrice" }));
});
app.get("/trismegistus", (req, res) => {
  res.send(JSON.stringify({
  	instance: Math.random()
  }));
});

// Routes
app.use("/health", healthRouter);
app.use("/secrets", secretsRouter);
app.use("/ai", textAiRouter);
app.use("/bots/hermes", hermesRouter);
app.use("/kv", kvRouter);
app.use("/cron", cronRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
