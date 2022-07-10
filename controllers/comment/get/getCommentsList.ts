import { RequestHandler } from "express";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import prisma from "../../../prisma";
import { errorResponse } from "../../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { paginatedResults } from "../../../utils/paginatedResult";
import { getPaginationValue } from "../../../utils/getPaginatedParams";
import { GetCommentsListParams } from "../../../infrastructure/comment/get";

export const getCommentsList: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  EmptyInterface,
  GetCommentsListParams
> = async (req, res) => {
  const { pageNumber, pageSize, categoryPostId } = req.query;

  const validationStatus = validationResult(req.query);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        categoryPostId,
      },
      ...getPaginationValue({ pageSize, pageNumber }),
    });
    const commentsCount = await prisma.comment.count();

    if (comments && (commentsCount || commentsCount === 0)) {
      return res
        .status(200)
        .send(paginatedResults(comments, pageNumber, pageSize, commentsCount));
    }

    return errorResponse(res, 400, "Loading comments failed, please try again");
  } catch (err) {
    errorResponse(res, 500);
  }
};
