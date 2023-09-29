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
}

export const userService = new UserService();
