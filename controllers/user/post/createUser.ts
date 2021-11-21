import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { uploadFile } from "../../../config/s3-bucket";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { CreateUserParams } from "../../../infrastructure/user/post";
import { sendEmailAfterUserRegister } from "../../mailers";

export const createUser: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  CreateUserParams
> = async (req, res) => {
  const { firstName, lastName, nickName, email, password } = req.body;
  const avatar = req.file;

  if (!avatar) {
    return errorResponse(res, 400, "Avatar is required");
  }

  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const existingUser = await Prisma.user.findFirst({
      where: { email: email },
    });

    if (!existingUser) {
      const imageUrl = avatar!.filename;
      await uploadFile(avatar!);
      const hashedPw = await bcrypt.hash(password, 12);
      await Prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          nickName,
          passwordHash: hashedPw,
          avatarUrl: imageUrl,
          policy: true,
        },
      });

      res.status(201).send({ message: "User successfully created" });
      sendEmailAfterUserRegister(firstName, email);
    } else {
      errorResponse(res, 422, "User already exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
