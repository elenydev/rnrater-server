import { Router } from "express";
import { createCategory } from "../../../controllers/categories/post/createCategory";
import verifyToken from "../../../middleware/verifyToken";
import { createCategoryValidator } from "../../../validators/category/post";

const router = Router();

router.post(
  "/createCategory",
  verifyToken,
  createCategoryValidator(),
  createCategory
);


export default router;
