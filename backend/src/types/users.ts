import type { UserRole } from "@prisma/client";

export type CreateUserData = {
  login: string;
  password: string;
  name: string;
  lastName: string;
  role: UserRole;
};

export type UpdateUserData = {
  login?: string;
  password?: string;
  name: string;
  lastName: string;
  role?: UserRole;
};
