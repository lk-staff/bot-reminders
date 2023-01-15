import { Bot, session } from "grammy";
import { FileAdapter } from "@grammyjs/storage-file";
import { BotContext } from "./types/BotContext";
import { config } from "./config";

import { mainComposer } from "./composers";
import { authGuard } from "./middlewares/authGuard";

const bot = new Bot<BotContext>(config.BOT_TOKEN);

bot.api.setMyCommands([
  { command: "start", description: "Начать работу с ботом" },
  {
    command: "clear",
    description: "Очистить напоминания более 7 дневной давности",
  },
]);

bot.use(authGuard);

function getSessionKey(ctx: BotContext) {
  return ctx.chat?.id.toString();
}

bot.use(
  session({
    initial: () => ({
      reminders: [],
      ...getSessionKey,
    }),
    storage: new FileAdapter({
      dirName: "sessions",
    }),
  })
);

bot.use(mainComposer);

bot.start({
  onStart: (botInfo) =>
    console.log(
      `Bot launched:\n    id: ${botInfo.id},\n    username: ${botInfo.username}`
    ),
});
