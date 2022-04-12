import { check } from "express-validator";

export const getCategoryPostsValidator = () => check("categoryId").exists();

export const getCategoryPostValidator = () => check("categoryPostId").exists();
