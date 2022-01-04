import { Request, Response, NextFunction } from "express";
import {
  EmptyInterface,
  PagingQueryParams,
} from "../infrastructure/interfaces/shared";
import { errorResponse } from "../utils/errorResponse";

export default (
  req: Request<
    EmptyInterface,
    EmptyInterface,
    EmptyInterface,
    PagingQueryParams
  >,
  res: Response,
  next: NextFunction
): void | Response => {
  if (!req.query.pageNumber && !req.query.pageSize) {
    req.query.pageNumber = 1 as unknown as string;
    req.query.pageSize = 10 as unknown as string;
    return;
  }

  if (+req.query.pageSize > 50) {
    return errorResponse(
      res,
      400,
      "Param pageSize can maximum accept value of 50, try again with lower"
    );
  }

  const { pageNumber, pageSize }: PagingQueryParams = req.query;
  const handledPageSize = +pageSize > 200 ? 200 : pageSize;

  req.query.pageNumber = +pageNumber * +handledPageSize as unknown as string;;
  req.query.pageSize = handledPageSize as unknown as string;;

  next();
};
