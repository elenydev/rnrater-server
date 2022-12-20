import { Response } from "express";
import { getFileReadStream } from "../../../config/s3-bucket";
import { errorResponse } from "../../../utils/errorResponse";

export const sendSingleFile = async (
  fileName: string,
  res: Response
): Promise<void> => {
  try {
    const readStream = await getFileReadStream(fileName, res);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, "Could not find requested resource");
  }
};
