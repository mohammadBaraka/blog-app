import { baseUrl } from "@/app/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const posts = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["post"],

  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["post"],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
    getPostsByCategoryId: builder.query({
      query: (id) => ({
        url: `/posts/category/${id}`,
        method: "GET",
      }),
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByCategoryIdQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
} = posts;
