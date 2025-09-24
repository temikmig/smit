export type LoginRequest = {
  login: string;
  password: string;
};

export const UserRoleEnum = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  WORKER: "WORKER",
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  WORKER: "Сотрудник",
};

export interface User {
  id: string;
  login: string;
  name: string;
  lastName: string;
  role: UserRole;
  password?: string;
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

export type LogoutResponse = {
  msg: string;
};
