import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async post(dto: IUser): Promise<any> {
    return await User.create(dto);
  }

  public async delete(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    });
  }
}

export const userRepository = new UserRepository();
