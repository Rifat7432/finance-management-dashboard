import { baseApi } from "@/redux/services/API";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "users/profile",
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
  }),
});

export const { useGetUserQuery, useEmailUserMutation } = userApi;
