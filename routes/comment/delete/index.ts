import { Router } from "express";
import verifyToken from "../../../middleware/verifyToken";
import { deleteComment } from "../../../controllers/comment/delete/deleteComment";
import { deleteCommentValidator } from "../../../validators/comment/delete";

const router = Router();

router.post(
  "/deleteComment/:commentId",
  verifyToken,
  deleteCommentValidator(),
  deleteComment
);

export default router;
