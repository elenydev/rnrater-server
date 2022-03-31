import { Router } from "express";
import { createCategory } from "../../../controllers/categories/post/createCategory";
import verifyToken from "../../../middleware/verifyToken";
import { createCategoryValidator } from "../../../validators/category/post";
import upload from "../../../config/multer";

const router = Router();

router.post(
  "/createCategory",
  verifyToken,
  createCategoryValidator(),
  upload.single("categoryImage"),
  createCategory
);


export default router;
