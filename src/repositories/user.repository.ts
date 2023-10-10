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
    return await User.create(dto);
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

  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async setStatus(userId: string, status: any): Promise<void> {
    await User.updateOne({ _id: userId }, { $set: { status } });
  }
}

export const userRepository = new UserRepository();
