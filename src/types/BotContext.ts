import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";
import { SessionData } from "./SessionData";

export type BotContext = Context &
  ConversationFlavor<Context> &
  SessionFlavor<SessionData>;
