import { NextFunction } from "grammy";
import { BotContext } from "src/types/BotContext";

const users: number[] = [792482249, 5251552822, 821100660];

async function authGuard(ctx: BotContext, next: NextFunction): Promise<void> {
  for (const user of users) {
    if (user === ctx.from?.id) {
      await next();
      return;
    }
  }
  console.log(`У пользователя ${ctx.from?.username} нет прав!`);
}

export { authGuard };
