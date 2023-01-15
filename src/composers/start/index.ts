import { Composer } from "grammy";
import { BotContext } from "src/types/BotContext";
import { mainKeyboard } from "./keyboards";

export const startComposer = new Composer<BotContext>();

startComposer.command("start", async (ctx) => {
  await ctx.reply(
    `Привет, ${ctx.from?.username}, я бот для запоминания разных штук, напиши мне и я запомню!`,
    { reply_markup: mainKeyboard }
  );
});
