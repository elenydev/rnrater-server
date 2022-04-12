import { PagingQueryParams } from "../../interfaces/shared";

export interface GetCategoriesParams extends PagingQueryParams {}

export interface GetCategoryImageParams {
  categoryId: string;
}
