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
    getUserFinanceTrack: builder.query({
      query: (query) => {
        return {
          url: "admin/users/finance-track",
          method: "GET",
          params: query,
        };
      },
    }),
    getUserExpensesDetails: builder.query({
      query: (id) => {
        return {
          url: `admin/user/expenses-details/${id}`,
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

export const {
  useGetUserQuery,
  useEmailUserMutation,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetUserFinanceTrackQuery,
  useGetUserExpensesDetailsQuery
} = userApi;
