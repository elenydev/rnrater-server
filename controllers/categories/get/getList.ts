import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { GetCategoriesParams } from "../../../infrastructure/categories/get";
import { paginatedResults } from "../../../utils/paginatedResult";
import { getPaginationValue } from "../../../utils/getPaginatedParams";

export const getList: RequestHandler<
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
    const categories = await prisma.category.findMany({
      ...getPaginationValue({ pageSize, pageNumber }),
    });
    const categoriesCount = await prisma.category.count();

    if ((categories && categoriesCount) || categoriesCount === 0) {
      return res
        .status(200)
        .send(
          paginatedResults(categories, pageNumber, pageSize, categoriesCount)
        );
    }

    return errorResponse(
      res,
      400,
      "Loading categories failed, please try again"
    );
  } catch (err) {
    errorResponse(res, 500);
  }
};
