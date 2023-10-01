import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users;
  }

  public async post(dto: IUser): Promise<IUser> {
    await this.isEmailUniq(dto.email);
    const user = await userRepository.post(dto);

    return user;
  }

  public async delete(id: string): Promise<any> {
    const deletedCount = await userRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("User not found", 404);
    }

    return deletedCount;
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.put(id, dto);
  }

  private async isEmailUniq(email: string): Promise<void> {
    const user = await userRepository.getOneByParams({ email });
    if (user) {
      throw new ApiError("The user with this email already exist", 409);
    }
  }
}

export const userService = new UserService();
