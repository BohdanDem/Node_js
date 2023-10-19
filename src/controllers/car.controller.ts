import { NextFunction, Request, Response } from "express";

import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";
import { ITokenPayload } from "../types/token.types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = req.res.locals;

      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async post(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const createdCar = await carService.post(req.body, userId);

      res.status(201).json(createdCar);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const { id } = req.params;
      await carService.delete(id, userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const { id } = req.params;

      const car = await carService.put(id, req.body, userId);

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
