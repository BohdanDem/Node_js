import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "3min",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "5min",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionToken(payload: ITokenPayload): {
    actionToken: string;
  } {
    const actionToken = jwt.sign(payload, configs.JWT_ACTION_SECRET, {
      expiresIn: "5min",
    });

    return { actionToken };
  }

  public checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public checkActionToken(token: string): ITokenPayload {
    try {
      const secret = configs.JWT_ACTION_SECRET;
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenService = new TokenService();
