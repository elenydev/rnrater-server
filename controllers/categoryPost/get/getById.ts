import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { GetCategoryPostByIdParams } from "../../../infrastructure/categoryPost/get";

export const getById: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCategoryPostByIdParams
> = async (req, res) => {
  const { categoryPostId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const categoryPost = await prisma.categoryPost.findFirst({
      where: {
        id: categoryPostId,
      },
    });

    if (categoryPost) {
      return res
        .status(200)
        .send({
          result: categoryPost
        }
        );
    }

    return errorResponse(
      res,
      400,
      "Loading category post failed, please try again"
    );
  } catch (err) {
    errorResponse(res, 500);
  }
};
