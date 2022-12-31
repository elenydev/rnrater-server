import { Router } from "express";
import { getById } from "../../../controllers/categoryPost/get/getById";
import { getCategoryPostImage } from "../../../controllers/categoryPost/get/getCategoryPostImage";
import { getList } from "../../../controllers/categoryPost/get/getList";
import handlePaging from "../../../middleware/paging";
import verifyToken from "../../../middleware/verifyToken";
import { getCategoryPostImageValidator, getCategoryPostsValidator, getCategoryPostValidator } from "../../../validators/categoryPost/get";

const router = Router();

router.get(
  "/getList",
  verifyToken,
  handlePaging,
  getCategoryPostsValidator(),
  getList
);

router.get(
  '/getById/:categoryPostId',
  verifyToken,
  getCategoryPostValidator(),
  getById
)

router.get(
  '/getCategoryPostImage',
  verifyToken,
  getCategoryPostImageValidator(),
  getCategoryPostImage
)

export default router;
