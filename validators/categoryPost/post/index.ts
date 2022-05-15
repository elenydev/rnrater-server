import { check } from "express-validator";

export const createCategoryPostValidator = () => (
  check("categoryId").trim().exists(), check("title").trim().exists()
);
