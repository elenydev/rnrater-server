import { Router } from "express";
import verifyToken from "../../../middleware/verifyToken";
import { createComment } from "../../../controllers/comment/post/createComment";
import { createCommentValidator } from "../../../validators/comment/post";

const router = Router();

router.post(
  "/createComment",
  verifyToken,
  createCommentValidator(),
  createComment
);

export default router;
