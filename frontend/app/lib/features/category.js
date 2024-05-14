import { baseUrl } from "@/app/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categories = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["categories"],

  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categories;
