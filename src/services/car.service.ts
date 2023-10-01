import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    const cars = await carRepository.getAll();

    return cars;
  }

  public async post(dto: ICar): Promise<ICar> {
    const car = await carRepository.post(dto);

    return car;
  }

  public async delete(id: string): Promise<any> {
    const deletedCount = await carRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("Car not found", 404);
    }

    return deletedCount;
  }

  public async put(id: string, dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.put(id, dto);
  }
}

export const carService = new CarService();
