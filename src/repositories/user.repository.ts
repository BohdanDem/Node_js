import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async register(dto: IUserCredentials): Promise<IUser> {
    const user = await User.create(dto);
    return user;
  }

  public async delete(id: string): Promise<any> {
    const { deletedCount } = await User.deleteOne({ _id: id });
    return deletedCount;
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    });
  }
}

export const userRepository = new UserRepository();
