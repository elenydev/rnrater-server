import { Router } from "express";
import { getList } from "../../../controllers/categories/get/getList";
import { getCategoryImage } from "../../../controllers/categories/post/categoryImage";
import handlePaging from "../../../middleware/paging";
import verifyToken from "../../../middleware/verifyToken";
import { getCategoryImageValidator } from "../../../validators/category/get";

const router = Router();

router.get("/getList", verifyToken, handlePaging, getList);

router.get(
  "/getCategoryImage",
  getCategoryImageValidator(),
  getCategoryImage
);

export default router;
