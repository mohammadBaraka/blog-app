import { baseUrl } from "@/app/utils/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authentecation = createApi({
  reducerPath: "authentecation",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    sendToken: builder.query({
      query: () => "/sendToken",
      providesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSendTokenQuery,
  useAddUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = authentecation;
