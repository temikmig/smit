export type LoginRequest = {
  login: string;
  password: string;
};

export const UserRoleEnum = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  EMPLOYEE: "Сотрудник",
};

export interface User {
  id: string;
  login: string;
  name: string;
  lastName: string;
  role: UserRole;
  userAvatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
};

export type LogoutResponse = {
  msg: string;
};
