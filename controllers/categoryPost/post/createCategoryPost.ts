import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { uploadFile } from "../../../config/s3-bucket";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { CreateCategoryPostParams } from "../../../infrastructure/categoryPost/post/index";

export const createCategoryPost: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  CreateCategoryPostParams
> = async (req, res) => {
  const { title, categoryId, description } = req.body;
  const categoryPostImage = req.file;

  if (!categoryPostImage) {
    return errorResponse(res, 400, "Category Post image is required");
  }

  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const existingCategoryPost = await Prisma.categoryPost.findFirst({
      where: { title },
    });

    if (!existingCategoryPost) {
      const imageUrl = categoryPostImage!.filename;
      await uploadFile(categoryPostImage!, res);
      await Prisma.categoryPost.create({
        data: {
          title,
          description,
          imageUrl,
          categoryId,
          averageRates: 0,
        },
      });

      res.status(201).send({ message: "Category Post successfully created" });
    } else {
      errorResponse(res, 422, "Category Post already exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
