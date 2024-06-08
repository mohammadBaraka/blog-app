import { baseUrl } from "@/app/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likes = createApi({
  reducerPath: "likes",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["like"],

  endpoints: (builder) => ({
    getAllLikes: builder.query({
      query: () => "/likes",
      providesTags: ["like"],
    }),
    toggleLike: builder.mutation({
      query: (data) => ({
        url: `/likes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["like"],
    }),
  }),
});

export const { useGetAllLikesQuery, useToggleLikeMutation } = likes;
