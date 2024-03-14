import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    // refersh Token
    refresh: builder.query({
      query: () => ({
        url: "users/refreshtoken",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ token: data.accessToken, user: data.user }));
        } catch (error) {}
      },
    }),

    // Social Authentication
    socialAuth: builder.mutation({
      query: ({ name, email, avatar }) => ({
        url: "users/socialauth",
        method: "POST",
        body: { name, email, avatar },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(userLoggedIn({ user: data.user }));
      },
    }),
  }),
});

export const { useRefreshQuery, useLoadUserQuery, useSocialAuthMutation } =
  apiSlice;
