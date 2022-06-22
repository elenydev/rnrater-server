import { check } from "express-validator";

export const createCommentValidator = () => (
  check("authorId").trim().exists(),
  check("categoryPostId").trim().exists(),
  check("content").trim().exists()
);
