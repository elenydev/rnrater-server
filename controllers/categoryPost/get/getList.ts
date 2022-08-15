import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { paginatedResults } from "../../../utils/paginatedResult";
import { getPaginationValue } from "../../../utils/getPaginatedParams";
import { GetCategoryPostsParams } from "../../../infrastructure/categoryPost/get";

export const getList: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCategoryPostsParams
> = async (req, res) => {
  const { pageNumber, pageSize, categoryId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const categoryPosts = await prisma.categoryPost.findMany({
      where: {
        categoryId,
      },
      ...getPaginationValue({ pageSize, pageNumber }),
    });
    const categoryPostsCount = await prisma.categoryPost.count({
      where: {
        categoryId
      }
    });

    if (categoryPosts && (categoryPostsCount || categoryPostsCount === 0)) {
      return res
        .status(200)
        .send(
          paginatedResults(
            categoryPosts,
            pageNumber,
            pageSize,
            categoryPostsCount
          )
        );
    }

    return errorResponse(
      res,
      400,
      "Loading category posts failed, please try again"
    );
  } catch (err) {
    errorResponse(res, 500);
  }
};
