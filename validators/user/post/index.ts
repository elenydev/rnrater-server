import { check, body } from "express-validator";

export const createUserValidator = () => (
  check("email").trim().isEmail(),
  check("password").trim().exists().isLength({ min: 8 }),
  check("policy").custom((policy) => policy === true),
  check("lastName").trim().exists(),
  check("firstName").trim().exists(),
  check("nickname").trim().exists()
);

export const authenticateUserValidator = () => (
  body("email").isEmail(), body("password").exists().isLength({ min: 8 })
);
