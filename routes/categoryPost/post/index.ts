import { Router } from "express";
import upload from "../../../config/multer";
import { createCategoryPost } from "../../../controllers/categoryPost/post/createCategoryPost";
import { createCategoryPostValidator } from "../../../validators/categoryPost/post";
import verifyToken from "../../../middleware/verifyToken";

const router = Router();

router.post(
  "/createCategoryPost",
  verifyToken,
  createCategoryPostValidator(),
  upload.single("categoryPostImage"),
  createCategoryPost
);

export default router;
