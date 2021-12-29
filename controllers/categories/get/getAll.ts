import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { GetCategoriesParams } from "../../../infrastructure/categories/get";

export const getCategories: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCategoriesParams
> = async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const categories = await prisma.category.findFirst({
      skip: pageNumber,
      take: pageSize,
    });

    return errorResponse(res, 400, "Loading categories failed, please try again");
  } catch (err) {
    errorResponse(res, 500);
  }
};
