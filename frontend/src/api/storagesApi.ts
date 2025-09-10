import { createApi } from "@reduxjs/toolkit/query/react";
import storageProductsData from "../data/storageProducts.json";
import storagesData from "../data/storages.json";

export const storagesApi = createApi({
  reducerPath: "storagesApi",
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    getStorages: builder.query<typeof storagesData, void>({
      query: () => "",
      transformResponse: () => storagesData,
    }),

    getStorageById: builder.query<(typeof storagesData)[0] | undefined, string>(
      {
        query: () => "",
        transformResponse: (_, __, id) => {
          return storagesData.find((s) => s.id === id);
        },
      }
    ),

    getStorageProducts: builder.query<
      {
        data: typeof storageProductsData;
        pagination: { page: number; limit: number; total: number };
      },
      { storageId?: string; page: number; limit: number }
    >({
      query: () => "",
      transformResponse: (_, __, arg) => {
        let filtered = storageProductsData;

        // фильтрация по складу
        if (arg.storageId) {
          filtered = filtered.filter(
            (item) => item.warehouseId === arg.storageId
          );
        }

        const start = (arg.page - 1) * arg.limit;
        const end = start + arg.limit;
        const sliced = filtered.slice(start, end);

        return {
          data: sliced,
          pagination: {
            page: arg.page,
            limit: arg.limit,
            total: filtered.length,
          },
        };
      },
    }),

    getStorageProductById: builder.query<
      (typeof storageProductsData)[0] | undefined,
      string
    >({
      query: () => "",
      transformResponse: (_, __, id) => {
        return storageProductsData.find((s) => s.id === id);
      },
    }),
  }),
});

export const {
  useGetStoragesQuery,
  useGetStorageByIdQuery,
  useGetStorageProductsQuery,
  useGetStorageProductByIdQuery,
} = storagesApi;
