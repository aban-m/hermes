import { Router } from "express";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const router = Router();

router.use(await bot.webhookCallback("/webhook"));
router.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "Hermes is up and running" }));
});

bot.on("message", (ctx) => {
  ctx.reply("Hello");
});
export default router;
