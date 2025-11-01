import { baseApi } from "@/redux/services/API";
const prefix = "/appointments";
const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      query: ( id ) => {
        return {
          url: `/admin${prefix}/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["getAppointments"],
    }),
  }),
});

export const { useGetAppointmentsQuery, useUpdateAppointmentMutation } =
  appointmentApi;
