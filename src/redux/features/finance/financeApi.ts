import { baseApi } from "@/redux/services/API";

const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    getUserNotificationSettings: builder.query({
      query: (id) => {
        return {
          url: `admin/notification-settings/${id}`,
          method: "GET",
        };
      },
    }),
    updateUserNotificationSettings: builder.mutation({
      query: ({ userId, data }) => {
        return {
          url: `admin/notification-settings/${userId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetUserFinanceTrackQuery,
  useGetUserExpensesDetailsQuery,
  useGetUserNotificationSettingsQuery,
  useUpdateUserNotificationSettingsMutation,
} = financeApi;
