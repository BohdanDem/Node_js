import { ObjectId } from "mongodb";

//import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/actionToken.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser, IUserCredentials } from "../types/user.type";
//import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser) {
    try {
      await this.isEmailUniq(dto.email);
      const hashedPassword = await passwordService.hash(dto.password);
      const user = await userRepository.register({
        ...dto,
        password: hashedPassword,
        isValid: false,
      });

      const actionToken = await tokenService.generateActionToken({
        userId: user._id.toString(),
        name: user.name,
      });

      await actionTokenRepository.create({
        ...actionToken,
        userId: user._id,
        name: dto.name,
      });

      // await emailService.sendMail(
      //   "bogdandemchuk.1@gmail.com",
      //   EEmailAction.REGISTER,
      //   { name: "Bohdan" },
      // );

      return actionToken;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IUserCredentials): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOneByParams({ email: dto.email });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        userId: user._id.toString(),
        name: user.name,
      });
      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
        name: payload.name,
      });

      await Promise.all([
        await tokenRepository.create({
          ...tokensPair,
          _userId: new ObjectId(payload.userId),
        }),
        await tokenRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(accessToken: string): Promise<void> {
    try {
      await tokenRepository.deleteOne({ accessToken });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logoutAll(userId: string): Promise<void> {
    try {
      await tokenRepository.deleteManyByUserId(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async isEmailUniq(email: string): Promise<void> {
    const user = await userRepository.getOneByParams({ email });
    if (user) {
      throw new ApiError("The user with this email already exist", 409);
    }
  }

  public async validate(payload: ITokenPayload): Promise<void> {
    try {
      await actionTokenRepository.validate(payload);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
