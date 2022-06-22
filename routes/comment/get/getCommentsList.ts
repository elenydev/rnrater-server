import { Router } from "express";
import verifyToken from "../../../middleware/verifyToken";
import { getCommentsListValidator } from "../../../validators/comment/get";
import handlePaging from "../../../middleware/paging";
import { getCommentsList } from "../../../controllers/comment/get/getCommentsList";

const router = Router();

router.post(
  "/getCommentsList",
  verifyToken,
  handlePaging,
  getCommentsListValidator(),
  getCommentsList
);

export default router;
