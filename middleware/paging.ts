import { Request, Response, NextFunction } from "express";
import {
  EmptyInterface,
  PagingQueryParams,
} from "../infrastructure/interfaces/shared";
import { errorResponse } from "../utils/errorResponse";

export const handlePaging = (
  req: Request<
    EmptyInterface,
    EmptyInterface,
    EmptyInterface,
    PagingQueryParams
  >,
  res: Response,
  next: NextFunction
): void | Response => {
  if (!req.query.pageNumber || !req.query.pageSize) {
    return errorResponse(res, 400, "Loading list failed, please try again");
  }

  const { pageNumber, pageSize }: PagingQueryParams = req.query;
  const handledPageSize = pageSize > 200 ? 200 : pageSize;

  req.query.pageNumber = pageNumber * handledPageSize;
  req.query.pageSize = handledPageSize;

  next();
};
