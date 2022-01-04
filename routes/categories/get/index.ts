import { Router } from "express";
import { getList } from "../../../controllers/categories/get/getList";
import handlePaging from "../../../middleware/paging";
import verifyToken from "../../../middleware/verifyToken";

const router = Router();

router.get(
  "/getList",
  verifyToken,
  handlePaging,
  getList
);


export default router;
