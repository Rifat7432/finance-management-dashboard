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
    getUserById: builder.query({
      query: (id: string) => {
        return {
          url: `users/user/${id}`,
          method: "GET",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `users/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
    blockUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `users/block/${id}`,
          method: "DELETE",
        };
      },
    }),
    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: "users",
          method: "GET",
          params: query,
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

export const {
  useGetUserQuery,
  useEmailUserMutation,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = userApi;
