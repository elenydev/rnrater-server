import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { sendSingleFile } from "../../files/post";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { GetCategoryImageParams } from "../../../infrastructure/category/get";

export const getCategoryImage: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCategoryImageParams
> = async (req, res) => {
  const { categoryId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (category) {
      return await sendSingleFile(category.categoryImageUrl, res);
    }

    return errorResponse(res, 400, "We can't find a category, try again");
  } catch (err) {
    errorResponse(res, 500);
  }
};
