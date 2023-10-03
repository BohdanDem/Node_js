import { Car } from "../models/Car.model";
import { ICar } from "../types/car.type";

class CarRepository {
  public async getAll(): Promise<ICar[]> {
    return await Car.find();
  }

  public async findById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async post(dto: ICar): Promise<ICar> {
    return await Car.create(dto);
  }

  public async delete(id: string): Promise<any> {
    const { deletedCount } = await Car.deleteOne({ _id: id });
    return deletedCount;
  }

  public async put(id: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    });
  }
}

export const carRepository = new CarRepository();
