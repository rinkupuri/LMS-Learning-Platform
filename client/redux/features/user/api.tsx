import { apiSlice } from "../api/apislicer";

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all user admin route
    getAllUsersAdmin: builder.query({
      query: () => ({
        url: "users/getAllAdmin",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // get all admin roled users
    getAllAdmin: builder.query({
      query: () => ({
        url: "users/getadmins",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // update user role

    updateRole: builder.mutation({
      query: (data) => ({
        url: `users/update-role`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useGetAllUsersAdminQuery,
  useGetAllAdminQuery,
  useUpdateRoleMutation,
} = userAPI;
