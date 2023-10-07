import { FilterQuery } from "mongoose";

import { ActionToken } from "../models/ActionToken.model";
import { User } from "../models/User.model";
import { IActionToken } from "../types/token.types";
import { IUser } from "../types/user.type";

export class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async findOne(
    params: FilterQuery<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
