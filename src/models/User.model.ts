import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum age is 1"],
      max: [199, "Maximum age is 199"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
  },
  {
    //timestamps: true,
    //versionKey: false,
  },
);

export const User = model("user", userSchema);
