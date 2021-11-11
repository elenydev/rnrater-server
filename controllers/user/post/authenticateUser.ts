import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import jwt from "jsonwebtoken";
import { AuthenticateUserParams } from "../../../infrastructure/user/post";

export const authenticateUser: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  AuthenticateUserParams
> = async (req, res) => {
  const { email, password } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await Prisma.user.findFirst({
      where: { email: email },
      include: { favouriteMovies: true },
    });

    if (user !== null) {
      await bcrypt
        .compare(password, user.passwordHash)
        .then((match) => {
          if (match) {
            const {
              firstName,
              lastName,
              email,
              avatarUrl,
              id,
              favouriteMovies,
            } = user;
            const token = jwt.sign(
              { email: email, userId: id },
              process.env.SECRET!,
              { expiresIn: "1h" }
            );

            return res.status(201).send({
              result: {
                firstName,
                lastName,
                email,
                avatarUrl,
                userId: id,
                accessToken: token,
                favouriteMovies: favouriteMovies,
              },
              message: "Successfull authorization",
            });
          } else {
            errorResponse(
              res,
              401,
              "Wrong password or email provided, please try again"
            );
          }
        })
        .catch((err) => errorResponse(res, 400, err));
    } else {
      errorResponse(res, 404, "User doesn't exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
