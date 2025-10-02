import { baseApi } from "@/redux/services/API";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "user",
          method: "GET",
        };
      },
    }),
    emailUser: builder.mutation({
      query: (email) => {
        return {
          url: "email",
          method: "POST",
          body: email,
        };
      },
    }),
    login: builder.mutation({
      query: (loginData) => {
        return {
          url: "login",
          method: "POST",
          body: loginData,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useEmailUserMutation, useLoginMutation } =
  userApi;
