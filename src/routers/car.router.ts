import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("", carController.getAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.post,
);

router.delete("/:id", commonMiddleware.isIdValid("id"), carController.delete);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.put,
);

export const carRouter = router;
