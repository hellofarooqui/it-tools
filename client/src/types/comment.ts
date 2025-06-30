import type { UserType } from "./user";

export interface CommentType {
  _id: string;
  user: UserType;
  comment: string;
  createdAt: string;
}
