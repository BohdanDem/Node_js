import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";

class CarMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const car = await carRepository.findById(id);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      req.res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
