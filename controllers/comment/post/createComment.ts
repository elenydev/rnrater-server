import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { PostCommentParams } from "../../../infrastructure/comment/post";
import { emitEvent } from "../../../services/socketio/socketio";
import { sendPushNotification } from "../../../services/notifications/sendPushNotification";

export const createComment: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  PostCommentParams
> = async (req, res) => {
  const { authorId, categoryPostId, content } = req.body;
  console.log(req)
  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    await Prisma.comment.create({
      data: {
        authorId,
        categoryPostId,
        content,
      },
    });

    sendPushNotification(
      "ExponentPushToken[fB8YQdKm-GRMNOnT_Ry-z-]",
      "Comment added"
    );
    emitEvent(req, `${categoryPostId}-comment-added`);

    res.status(201).send({ message: "Comment successfully added" });
  } catch (err) {
    errorResponse(res, 500);
  }
};
