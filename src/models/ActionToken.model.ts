import { model, Schema, Types } from "mongoose";

import { IActionToken } from "../types/token.types";
import { User } from "./User.model";

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
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
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
