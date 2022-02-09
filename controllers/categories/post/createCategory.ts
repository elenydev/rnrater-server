import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../../../utils/errorResponse";
import Prisma from "../../../prisma";
import { EmptyInterface } from "../../../infrastructure/interfaces/shared";
import { uploadFile } from "../../../config/s3-bucket";
import { validationErrorResponse } from "../../../utils/validationErrorResponse";
import { CreateCategoryParams } from "../../../infrastructure/categories/post";

export const createCategory: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  CreateCategoryParams
> = async (req, res) => {
  const { name } = req.body;
  const categoryImage = req.file;

  if (!categoryImage) {
    return errorResponse(res, 400, "Category image is required");
  }

  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const imageUrl = categoryImage!.filename;
    await uploadFile(categoryImage!, res);
    await Prisma.category.create({
      data: {
        name,
        categoryImageUrl: imageUrl,
      },
    });

    res.status(201).send({ message: "Category successfully created" });
  } catch (err) {
    errorResponse(res, 500);
  }
};
