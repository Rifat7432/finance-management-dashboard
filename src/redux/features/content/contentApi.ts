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
    updateContent: builder.mutation({
      query: ({ id, updateContentData }) => {
        return {
          url: `${prefix}/${id}`,
          method: "PATCH",
          body: updateContentData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    deleteContent: builder.mutation({
      query: (id) => {
        return {
          url: `${prefix}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useDeleteContentMutation,
  useGetContentsQuery,
  useUpdateContentMutation,
} = contentApi;
