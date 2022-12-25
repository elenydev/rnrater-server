import { check } from "express-validator";

export const getCategoryImageValidator = () => check("categoryId").exists();
