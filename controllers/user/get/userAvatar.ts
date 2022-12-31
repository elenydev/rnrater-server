import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { GetUserAvatarParams } from "../../../infrastructure/user/get";
import { sendSingleFile } from "../../files/post";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";

export const getUserAvatar: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetUserAvatarParams
> = async (req, res) => {
  const { userId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        comments: true,
        evaluatedCategoryPosts: true,
      },
    });

    if (user) {
      const result = await sendSingleFile(user.avatarUrl, res);
      return result;
    }

    return errorResponse(res, 400, "We can't find a user, try again");
  } catch (err) {
    return errorResponse(res, 500);
  }
};
