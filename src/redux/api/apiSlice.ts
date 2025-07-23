import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  subscriptions: "Active" | "Expired"
  startDate: string
  endDate: string
}

export interface Video {
  id: string
  title: string
  duration: string
  thumbnail: string
  category: string
}

export interface Subscription {
  id: string
  title: string
  type: string
  price: string
  features: string[]
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["User", "Video", "Subscription"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getVideos: builder.query<Video[], void>({
      query: () => "videos",
      providesTags: ["Video"],
    }),
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => "subscriptions",
      providesTags: ["Subscription"],
    }),
    blockUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}/block`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    createSubscription: builder.mutation<Subscription, Partial<Subscription>>({
      query: (subscription) => ({
        url: "subscriptions",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["Subscription"],
    }),
    uploadVideo: builder.mutation<Video, FormData>({
      query: (formData) => ({
        url: "videos",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetVideosQuery,
  useGetSubscriptionsQuery,
  useBlockUserMutation,
  useCreateSubscriptionMutation,
  useUploadVideoMutation,
} = apiSlice
