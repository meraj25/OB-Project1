import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({

  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({

    getAllTasks: builder.query({
      query: () => `/tasks`,
    }),

    createTask: builder.mutation({
        query: (task) =>({
            url: "/tasks",
            method: "POST",
            body: task,
        })
    
    }),

    getTaskByAssignee: builder.query({
        query: (assigneeId) => `/tasks/${assigneeId}`
    }),

    getTaskByStatus: builder.query({
        query:(status) => `/tasks/status/${encodeURIComponent(status)}`
    }),

    updateTask: builder.mutation({
    query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body,
    }),
    }),
    deleteTask: builder.mutation({
    query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
    }),
    
}),





    resisterUser: builder.mutation({
        query:(body) =>({
            url: "/users/register",
            method:"POST",
            body: body


        })
    }),

    getAllUsers:builder.query({
        query:() => '/users'
    }),

    loginUser: builder.mutation({
        query:(body) => ({
            url: "/users/login",
            method:"POST",
            body:body,
        })
    }),

    logoutUser: builder.mutation({
        query:() => ({
            url:"/users/logout",
            method:"POST"
        })
    }),

    getuser: builder.query({
        query:() => 'users/profile'
    })




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
    useResisterUserMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
    
 } = Api