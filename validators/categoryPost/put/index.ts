import { check } from "express-validator";

export const updateCategoryPostValidator = () => (
  check("postId").trim().exists(),
  check("version").exists().isNumeric()
);
