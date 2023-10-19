import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    const cars = await carRepository.getAll();

    return cars;
  }

  public async post(dto: ICar, userId: string): Promise<ICar> {
    const car = await carRepository.post(dto, userId);

    return car;
  }

  public async delete(id: string, userId: string): Promise<any> {
    await this.checkAbilityToManage(userId, id);
    const deletedCount = await carRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("Car not found", 404);
    }

    return deletedCount;
  }

  public async put(
    id: string,
    dto: Partial<ICar>,
    userId: string,
  ): Promise<ICar> {
    await this.checkAbilityToManage(userId, id);
    return await carRepository.put(id, dto);
  }

  private async checkAbilityToManage(
    userId: string,
    manageCarId: string,
  ): Promise<ICar> {
    const car = await carRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
    if (!car) {
      throw new ApiError("U can not manage this car", 403);
    }
    return car;
  }
}

export const carService = new CarService();
