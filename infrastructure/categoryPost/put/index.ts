import { CategoryPost } from "@prisma/client";

export interface UpdateCategoryPostParams {
  postId: string;
  data: Partial<CategoryPost>;
  version: number;
}
