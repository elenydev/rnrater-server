import aws from "aws-sdk";
import fs from "fs";
import { Response } from "express";
import { errorResponse } from "../utils/errorResponse";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadFile = async (file: Express.Multer.File, res: Response) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Body: fileStream,
      Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
  } catch (error) {
    errorResponse(res, 400, "Failed to upload a resource");
  }
};

export const getFileReadStream = async (fileKey: string, res: Response) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME!,
    };
    return s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    return errorResponse(res, 400, "We can't find requested resource");
  }
};
