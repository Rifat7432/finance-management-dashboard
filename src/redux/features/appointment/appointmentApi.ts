import { baseApi } from "@/redux/services/API";
const prefix = "/appointments";
const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointmentData) => {
        return {
          url: `${prefix}/`,
          method: "POST",
          body: appointmentData,
        };
      },
      invalidatesTags: ["getAppointments"],
    }),
    getAppointments: builder.query({
      query: (query) => {
        return {
          url: `${prefix}/all/appointment`,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["getAppointments"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, updateAppointmentData }) => {
        return {
          url: `${prefix}/${id}`,
          method: "PATCH",
          body: updateAppointmentData,
        };
      },
      invalidatesTags: ["getAppointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => {
        return {
          url: `${prefix}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAppointments"],
    }),
  }),
});

export const {useCreateAppointmentMutation,useDeleteAppointmentMutation,useGetAppointmentsQuery} = appointmentApi;
