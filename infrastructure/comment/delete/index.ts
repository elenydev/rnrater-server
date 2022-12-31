import * as core from "express-serve-static-core";

export interface DeleteCommentParams extends core.ParamsDictionary {
  commentId: string;
}
