import { Course } from "@/app/interface/AllInterface";
import { apiSlice } from "../api/apislicer";

export const courseAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create course
    createCourse: builder.mutation({
      query: (data: Course) => ({
        url: "course/create",
        method: "POST",
        body: data,
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // get one course for admin
    getCourse: builder.query({
      query: (id: string) => ({
        url: `course/getacourse/${id}`,
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // update course route
    updateCourse: builder.mutation({
      query: (data: Course) => ({
        url: `course/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // get All Course for admin
    getAllCourseForAdmin: builder.query({
      query: () => ({
        url: "course/getAllAdmin",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),

    // get all course for user
    getAllCourseForUser: builder.query({
      query: () => ({
        url: "course/get",
        method: "GET",
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetAllCourseForAdminQuery,
  useGetAllCourseForUserQuery,
} = courseAPI;
