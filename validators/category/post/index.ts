import { check } from "express-validator";

export const createCategoryValidator = () => (
  check("name").trim().exists()
);