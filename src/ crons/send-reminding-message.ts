import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";
import { IUser } from "../types/user.type";

dayjs.extend(utc);

const sendReminder = async function () {
  try {
    const date = dayjs().utc().subtract(1, "d");
    const users = await userRepository.findWithoutActivityAfterDate(
      date.toISOString(),
    );

    await Promise.all([
      users.map(async (user: IUser) => {
        await emailService.sendMail(user.email, EEmailAction.SEND_REMINDER, {
          name: user.name,
        });
      }),
    ]);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const sendMessageReminder = new CronJob("5 * 5 * *", sendReminder);
