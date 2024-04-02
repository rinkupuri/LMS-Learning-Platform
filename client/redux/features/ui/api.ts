import { apiSlice } from "../api/apislicer";

export const layoutAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getting banner layout
    getLayout: builder.query({
      query: () => ({
        url: "layout/get",
        method: "GET",
        withCredentials: true,
        credentials: "include" as const,
      }),
    }),
    // updating banner layout
    updateLayout: builder.mutation({
      query: (data) => ({
        url: "layout/update",
        method: "POST",
        body: data,
        withCredentials: true,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetLayoutQuery, useUpdateLayoutMutation } = layoutAPI;
