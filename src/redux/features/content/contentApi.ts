import { baseApi } from "@/redux/services/API";
const prefix = "/contents";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (contentData) => {
        return {
          url: `${prefix}/`,
          method: "POST",
          body: contentData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getContents: builder.query({
      query: (query) => {
        return {
          url: `${prefix}/`,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["getUser"],
    }),
    updateProfile: builder.mutation({
      query: (updateData) => {
        return {
          url: "/profile",
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useUpdateProfileMutation,
  useGetContentsQuery,
} = contentApi;
