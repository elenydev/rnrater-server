import { Router } from "express";
import upload from "../../../config/multer";
import { authenticateUser } from "../../../controllers/user/post/authenticateUser";
import { createUser } from "../../../controllers/user/post/createUser";
import {
  authenticateUserValidator,
  createUserValidator,
} from "../../../validators/user/post";

const router = Router();

router.post(
  "/createUser",
  createUserValidator(),
  upload.single("avatar"),
  createUser
);

router.post("/authenticateUser", authenticateUserValidator(), authenticateUser);

export default router;
