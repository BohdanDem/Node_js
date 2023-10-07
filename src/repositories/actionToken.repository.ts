import { FilterQuery } from "mongoose";

import { ActionToken } from "../models/ActionToken.model";
import { User } from "../models/User.model";
import { IActionToken, ITokenPayload } from "../types/token.types";

export class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async findOne(
    params: FilterQuery<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }

  public async validate(dto: ITokenPayload): Promise<void> {
    return await User.findByIdAndUpdate(
      dto.userId,
      {
        ...dto,
        isValid: true,
      },
      {
        returnDocument: "after",
      },
    );
  }
}

export const actionTokenRepository = new ActionTokenRepository();
