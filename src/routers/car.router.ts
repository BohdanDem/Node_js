import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
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
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.post,
);

router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  carController.delete,
);

router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.put,
);

export const carRouter = router;
