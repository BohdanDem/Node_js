import { ESmsAction } from "../enums/sms.action.enum";

export const smsTemplates = {
  [ESmsAction.REGISTER]: (name: string) =>
    `Hey, ${name}! \nGreat to see u in our platform.`,
};
