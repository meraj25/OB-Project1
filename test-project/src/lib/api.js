import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api',
    credentials: "include",
  }),
  tagTypes: ["Task", "User"], 
  endpoints: (builder) => ({

    getAllTasks: builder.query({
      query: () => `/tasks`,
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks/createTask",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"], 
    }),

    getTaskByAssignee: builder.query({
      query: (assigneeId) => `/tasks/${assigneeId}`,
      providesTags: ["Task"],
    }),

    getTaskByStatus: builder.query({
      query: (status) => `/tasks/status/${encodeURIComponent(status)}`,
      providesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"], 
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"], 
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
    }),

    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"], 
    }),

    getuser: builder.query({
      query: () => 'users/profile',
      providesTags: ["User"],
    }),
  }),
})

export const { 
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useGetTaskByAssigneeQuery,
    useGetTaskByStatusQuery,
    useGetAllUsersQuery,
    useGetuserQuery,
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = Api