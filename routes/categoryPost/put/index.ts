import { Router } from "express";
import verifyToken from "../../../middleware/verifyToken";
import { updateCategoryPost } from "../../../controllers/categoryPost/put/updateCategoryPost";
import { updateCategoryPostValidator } from "../../../validators/categoryPost/put";

const router = Router();

router.post(
  "/updateCategoryPost",
  verifyToken,
  updateCategoryPostValidator(),
  updateCategoryPost
);

export default router;
