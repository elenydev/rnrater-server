import { check } from "express-validator";

export const deleteCommentValidator = () =>
  check("commentId").trim().exists();
