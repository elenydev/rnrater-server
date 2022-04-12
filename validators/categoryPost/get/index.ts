import { check } from "express-validator";

export const getCategoryPostsValidator = () => check("categoryId").exists();
