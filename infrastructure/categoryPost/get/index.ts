import { PagingQueryParams } from "../../interfaces/shared";

export interface GetCategoryPostsParams extends PagingQueryParams {
  categoryId: string;
}
