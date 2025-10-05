import { Router } from "express";
import { Telegraf } from "telegraf";
import { sendNotification } from "../../core/notifications.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const router = Router();

router.use(await bot.webhookCallback("/webhook"));
router.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "Hermes is up and running" }));
});

bot.command("start", (ctx) => {
  ctx.reply("Hello");
});

bot.command("help", (ctx) => {
  ctx.reply("Help");
});

bot.command("notify", async (ctx) => {
  const text = ctx.payload;
  await sendNotification({
    priority: "urgent",
    message: text,
    topic: "main",
  });
});
export default router;
