import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { DeleteCommentParams } from "../../../infrastructure/comment/delete";

export const deleteComment: RequestHandler<
  DeleteCommentParams,
  EmptyInterface,
  EmptyInterface
> = async (req, res) => {
  const { commentId } = req.params;

  const validationStatus = validationResult(req.params);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    await Prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(201).send({ message: "Comment successfully deleted" });
  } catch (err) {
    errorResponse(res, 500);
  }
};
