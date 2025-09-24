import { UserRole } from "@prisma/client";
import type { Request } from "express";

export interface AuthUserPayload {
  sub: string;
  role: UserRole;
}

export interface AuthRequest<B = any> extends Request {
  user?: AuthUserPayload;
  body: B;
}

export type UpdateUserData = {
  login?: string;
  password?: string;
  name?: string;
  lastName?: string;
  role?: UserRole;
};
