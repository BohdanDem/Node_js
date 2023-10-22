import { Document } from "mongoose";

import { EUserStatus } from "../enums/ user-status.enum";
import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGenders;
  email: string;
  phone: string;
  password: string;
  status: EUserStatus;
  avatar: string;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}
