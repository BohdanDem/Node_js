import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { fileMiddleware } from "../middlewares/ files.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { QueryValidator } from "../validators/query.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(QueryValidator.query),
  userController.getAll,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  userController.delete,
);

router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.put,
);

router.post(
  "/:userId/avatar",
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar,
);

export const userRouter = router;
