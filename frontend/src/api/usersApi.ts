import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../common/types/authTypes";
import type { RootState } from "../store";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({ query: () => "/users/me" }),
    getUsers: builder.query<
      { users: User[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof User;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ page = 1, limit = 10, search, sortColumn, sortOrder }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        return `/users/list?${params.toString()}`;
      },
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: "/users/create", method: "POST", body }),
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateMe: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/users/update-me",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/delete/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateMeMutation,
  useDeleteUserMutation,
} = usersApi;
