import { apiSlice } from "../api/apislicer";
import { userRegistration } from "./authSlice";

type RegistrationResponce = {
  message: string;
  token: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponce, RegistrationData>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userRegistration({
              payload: data.token,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});
