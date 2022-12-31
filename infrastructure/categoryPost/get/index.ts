import { PagingQueryParams } from "../../interfaces/shared";
import * as core from "express-serve-static-core";

export interface GetCategoryPostsParams extends PagingQueryParams {
  categoryId: string;
}

export interface GetCategoryPostByIdParams extends core.ParamsDictionary {
  categoryPostId: string;
}

export interface GetCategoryPostImageParams extends core.ParamsDictionary {
  categoryPostId: string;
}
