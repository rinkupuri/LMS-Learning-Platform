import { apiSlice } from "../api/apislicer";

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersAdmin: builder.query({
      query: () => ({
        url: "users/getAllAdmin",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),
  }),
});

export const { useGetAllUsersAdminQuery } = userAPI;
