import { check } from "express-validator";

export const getCommentsListValidator = () =>
  check("categoryPostId").trim().exists();
