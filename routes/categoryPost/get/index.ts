import { Router } from "express";
import { getById } from "../../../controllers/categoryPost/get/getById";
import { getList } from "../../../controllers/categoryPost/get/getList";
import handlePaging from "../../../middleware/paging";
import verifyToken from "../../../middleware/verifyToken";
import { getCategoryPostsValidator, getCategoryPostValidator } from "../../../validators/categoryPost/get";

const router = Router();

router.get(
  "/getList",
  verifyToken,
  handlePaging,
  getCategoryPostsValidator(),
  getList
);

router.get(
  '/getById',
  verifyToken,
  getCategoryPostValidator(),
  getById
)

export default router;
