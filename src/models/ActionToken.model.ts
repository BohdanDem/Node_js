import { model, Schema } from "mongoose";

import { IActionToken } from "../types/token.types";

const actionTokenSchema = new Schema(
  {
    actionToken: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionToken = model<IActionToken>(
  "actionToken",
  actionTokenSchema,
);
