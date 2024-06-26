import { apiSlice } from "../api/apislicer";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponce = {
  message: string;
  token: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Account registeration Query
    register: builder.mutation<RegistrationResponce, RegistrationData>({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userRegistration({
              token: data.token,
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),

    // Account Activation Query
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "users/activate",
        method: "POST",
        body: { activationToken, activationCode },
        credentials: "include" as const,
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: data.user,
            })
          );
        } catch (error) {}
      },
    }),

    // Account Login Query
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "users/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {}
      },
    }),

    // update user QueryStatus
    updateUser: builder.mutation({
      query: ({ name }) => ({
        url: "users/update",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {}
      },
    }),

    // update profile Pic
    updateProfile: builder.mutation({
      query: ({ avatar }) => ({
        url: "users/update-profile",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {}
      },
    }),

    // change password
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "users/update-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
