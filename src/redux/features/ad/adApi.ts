import { baseApi } from "@/redux/services/API";
const prefix = "/ad";

const adApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAd: builder.mutation({
      query: (adData) => {
        return {
          url: `${prefix}/`,
          method: "POST",
          body: adData,
        };
      },
      invalidatesTags: ["getAds"],
    }),
    getAds: builder.query({
      query: (query) => {
        return {
          url: `${prefix}/`,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["getAds"],
    }),
    updateAd: builder.mutation({
      query: ({ id, updateAdData }) => {
        return {
          url: `${prefix}/${id}`,
          method: "PATCH",
          body: updateAdData,
        };
      },
      invalidatesTags: ["getAds"],
    }),
    deleteAd: builder.mutation({
      query: (id) => {
        return {
          url: `${prefix}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAds"],
    }),
  }),
});

export const {
  useCreateAdMutation,
  useDeleteAdMutation,
  useGetAdsQuery,
  useUpdateAdMutation,
} = adApi;
