import { Composer } from "grammy";
import { BotContext } from "src/types/BotContext";
import { startComposer } from "./start";
import { remindersComposer } from "./reminders";

export const mainComposer = new Composer<BotContext>();

mainComposer.use(startComposer);
mainComposer.use(remindersComposer);
