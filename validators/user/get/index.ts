import { check } from "express-validator";

export const getUserAvatarValidator = () => check("userId").exists();


