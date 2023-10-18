import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";

class UserService {
  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const [users, itemsFound] = await userRepository.getMany(query);

      // const user = await User.findOne({
      //   email: "julianne.oconner@kory.org",
      // }); //for methods!!!!!!!!!!!!!!!!!!!
      // const userNameWithAge = user.nameWithAge();
      // console.log(userNameWithAge);
      // const user = await User.findByEmail("julianne.oconner@kory.org");
      // console.log(user); //for statics
      // console.log(user.birthYear); //for virtual fields

      return {
        page: +query.page,
        limit: +query.limit,
        itemsFound,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
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
