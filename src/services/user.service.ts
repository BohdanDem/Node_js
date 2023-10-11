import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users;
  }

  public async delete(id: string): Promise<any> {
    const deletedCount = await userRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("User not found", 404);
    }

    return deletedCount;
  }

  public async put(
    id: string,
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser> {
    this.checkAbilityToManage(userId, id);
    return await userRepository.put(id, dto);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  private checkAbilityToManage(userId: string, id: string): void {
    if (userId !== id) {
      throw new ApiError("You can not manage this user", 403);
    }
  }
}

export const userService = new UserService();
