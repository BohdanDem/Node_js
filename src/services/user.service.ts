import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users;
  }

  public async post(dto: IUser): Promise<IUser> {
    const user = await userRepository.post(dto);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await userRepository.delete(id);
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.put(id, dto);
  }
}

export const userService = new UserService();
