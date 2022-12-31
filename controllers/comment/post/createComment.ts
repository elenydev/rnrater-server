import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { PostCommentParams } from "../../../infrastructure/comment/post";
import { emitEvent } from "../../../services/socketio/socketio";

export const createComment: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  PostCommentParams
> = async (req, res) => {
  const { authorId, categoryPostId, content } = req.body;
  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const comment = await Prisma.comment.create({
      data: {
        authorId,
        categoryPostId,
        content,
      },
      include: {
        author: true,
      },
    });

    res.status(201).send({ message: "Comment successfully added" });

    emitEvent(req, `${categoryPostId}-comment-added`, {
      id: comment.id,
      createdAt: comment.createdAt,
      author: comment.author,
      content: comment.content,
    });
  } catch (err) {
    errorResponse(res, 500);
  }
};
