import { Router } from "express";
import upload from "../../../config/multer";
import { createUser } from "../../../controllers/user/post/createUser";
import { createUserValidator } from "../../../validators/user/post";

const router = Router();

router.post(
  "/createUser",
  createUserValidator(),
  upload.single("avatar"),
  createUser
);

export default router;
