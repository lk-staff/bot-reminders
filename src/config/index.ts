import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  BOT_TOKEN: <string>process.env.BOT_TOKEN,
};
