export interface Reminder {
  id: string;
  createAt: Date;
  text: string;
}

export interface SessionData {
  reminders: Array<Reminder>;
}
