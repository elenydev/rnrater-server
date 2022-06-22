import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { UpdateCategoryPostParams } from "../../../infrastructure/categoryPost/put";

export const updateCategoryPost: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  UpdateCategoryPostParams
> = async (req, res) => {
  const { postId, data } = req.body;

  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const existingCategoryPost = await Prisma.categoryPost.findFirst({
      where: { id: postId },
    });

    if (existingCategoryPost) {
      await Prisma.categoryPost.update({
        where: {
          id: postId,
        },
        data: {
          ...data,
        },
      });

      res.status(201).send({ message: "Category Post successfully updated" });
    } else {
      errorResponse(res, 404, "Category Post doesn't exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
