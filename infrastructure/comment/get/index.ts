import { PagingQueryParams } from "../../interfaces/shared";

export interface GetCommentsListParams extends PagingQueryParams {
  categoryPostId: string;
}