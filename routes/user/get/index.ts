import { Router } from "express";
import { getUserAvatar } from "../../../controllers/user/get/userAvatar";
import { getUserAvatarValidator } from "../../../validators/user/get";

const router = Router();

router.get(
  "/userAvatar",
  getUserAvatarValidator(),
  getUserAvatar
);


export default router;
