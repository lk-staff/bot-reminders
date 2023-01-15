import { Keyboard } from "grammy";

export const mainKeyboard = new Keyboard()
  .text("Посмотреть за 1 день")
  .row()
  .text("Посмотреть за 7 деней")
  .resized()
  .oneTime(false);
