import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokensPair } from "../types/token.types";
import { IUserCredentials } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUserCredentials) {
    try {
      await this.isEmailUniq(dto.email);
      const hashedPassword = await passwordService.hash(dto.password);
      await userRepository.register({ ...dto, password: hashedPassword });
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
        userId: user._id,
        name: user.name,
      });
      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
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
}

export const authService = new AuthService();
