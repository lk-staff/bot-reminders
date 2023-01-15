import { Composer } from "grammy";
import { BotContext } from "src/types/BotContext";
import { v4 as uuidv4 } from "uuid";
import { Reminder } from "src/types/SessionData";

export const remindersComposer = new Composer<BotContext>();

remindersComposer.command("clear", async (ctx) => {
  const reminders = ctx.session.reminders.filter((reminder) => {
    const dateLocal = new Date();
    const createAt = new Date(reminder.createAt);
    return createAt.setDate(createAt.getDate() + 7) > dateLocal.valueOf();
  });

  ctx.session.reminders = reminders;
  await ctx.reply("Записи более 7 дневной давности удалены!");
});

remindersComposer.hears(/^Посмотреть за 1 день$/, async (ctx) => {
  const reminders = ctx.session.reminders.filter((reminder) => {
    const dateLocal = new Date();
    const createAt = new Date(reminder.createAt);
    return createAt.setDate(createAt.getDate() + 1) > dateLocal.valueOf();
  });

  let answer = "";

  reminders.forEach((reminder) => {
    answer += `${new Date(reminder.createAt).toLocaleString()}\n${
      reminder.text
    }\n\n`;
  });

  if (answer === "") {
    await ctx.reply("За сегодня напоминаний нет!");
  } else {
    await ctx.reply("Напоминания за 1 день: ");
    await ctx.reply(answer);
  }
});

remindersComposer.hears(/^Посмотреть за 7 деней$/, async (ctx) => {
  const reminders = ctx.session.reminders.filter((reminder) => {
    const dateLocal = new Date();
    const createAt = new Date(reminder.createAt);
    return createAt.setDate(createAt.getDate() + 7) > dateLocal.valueOf();
  });

  let answer = "";

  reminders.forEach((reminder) => {
    answer += `${new Date(reminder.createAt).toLocaleString()}\n${
      reminder.text
    }\n\n`;
  });

  if (answer === "") {
    await ctx.reply("За 7 дней напоминаний нет!");
  } else {
    await ctx.reply("Напоминания за 7 дней: ");
    await ctx.reply(answer);
  }
});

remindersComposer.on("message", async (ctx) => {
  const reminder: Reminder = {
    id: uuidv4(),
    createAt: new Date(),
    text: ctx.message.text || "",
  };
  ctx.session.reminders.push(reminder);
  await ctx.reply("Записал!");
});
