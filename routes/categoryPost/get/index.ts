import { Router } from "express";
import { getList } from "../../../controllers/categoryPost/get/getList";
import handlePaging from "../../../middleware/paging";
import verifyToken from "../../../middleware/verifyToken";
import { getCategoryPostsValidator } from "../../../validators/categoryPost/get";

const router = Router();

router.get(
  "/getList",
  verifyToken,
  handlePaging,
  getCategoryPostsValidator,
  getList
);

export default router;
