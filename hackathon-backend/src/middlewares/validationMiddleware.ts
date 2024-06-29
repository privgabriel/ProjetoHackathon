// src/middlewares/validationMiddleware.ts
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateUser = [
  check("name").isString().notEmpty(),
  check("login").isString().notEmpty(),
  check("password").isLength({ min: 6 }),
  check("email").isEmail(),
  check("profile").isString().notEmpty(),
  check("cpf").isString().isLength({ min: 11, max: 11 }),
  check("birthdate").isISO8601(),
  check("status").isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddress = [
  check("user_id").isInt(),
  check("street").isString().notEmpty(),
  check("city").isString().notEmpty(),
  check("state").isString().notEmpty(),
  check("zip_code").isString().notEmpty(),
  check("country").isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUser, validateAddress };
