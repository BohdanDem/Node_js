import { removeOldTokens } from "./remove-old-tokens.cron";
import { sendMessageReminder } from "./send-reminding-message";

export const cronRunner = () => {
  removeOldTokens.start();
  sendMessageReminder.start();
};
