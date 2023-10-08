import { Document } from "mongoose";

import { EUserStatus } from "../enums/ user-status.enum";
import { EGenders } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGenders;
  email: string;
  password: string;
  status: EUserStatus;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
