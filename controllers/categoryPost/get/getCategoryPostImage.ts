import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { sendSingleFile } from "../../files/post";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { GetCategoryPostImageParams } from "../../../infrastructure/categoryPost/get";

export const getCategoryPostImage: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCategoryPostImageParams
> = async (req, res) => {
  const { categoryPostId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const categoryPost = await prisma.categoryPost.findFirst({
      where: { id: categoryPostId },
    });

    if (categoryPost) {
      return await sendSingleFile(categoryPost.imageUrl, res);
    }

    return errorResponse(res, 400, "We can't find a category post, try again");
  } catch (err) {
    errorResponse(res, 500, "Something went wrong with fetching Category Post Image, try refresh the view");
  }
};
