import { BotContext } from "src/types/BotContext";
import { BotConversation } from "src/types/BotConversation";

export const addReminder = async (
  conversation: BotConversation,
  ctx: BotContext
) => {
  await ctx.reply(`Так, что нужно напомнить?`);
  const reminder = await conversation.form.text();
  await ctx.reply(`Когда нужно напомнить?`);
  const timeReminder = await conversation.form.text();

  conversation.session.reminders.push({
    reminder: reminder,
    timeReminder: timeReminder,
    isComplided: false,
  });

  await ctx.reply(`Хорошо напомню: ${reminder} ${timeReminder}`);
};

export const viewReminders = async (
  conversation: BotConversation,
  ctx: BotContext
) => {
  const reminders = conversation.session.reminders.filter(
    (reminder) => reminder.isComplided === false
  );
  let message = "";
  reminders.forEach((reminder, index) => {
    message += `/${index + 1} ${reminder.reminder} ${reminder.timeReminder}\n`;
  });

  if (message === "") {
    await ctx.reply(`На данный момент нет незавершенных напоминаний!`);
    return;
  }
  await ctx.reply(`Вот твои напоминания:`);
  await ctx.reply(`${message}`);
};
