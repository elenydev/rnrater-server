import * as core from "express-serve-static-core";

export interface EmptyInterface {}

export interface PagingQueryParams extends core.ParamsDictionary {
  pageNumber: string;
  pageSize: string;
}
