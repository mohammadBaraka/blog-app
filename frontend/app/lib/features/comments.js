import { baseUrl } from "@/app/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const comments = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["comment"],

  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: () => "/comments",
      providesTags: ["comment"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = comments;
