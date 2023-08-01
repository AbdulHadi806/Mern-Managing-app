import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        fetchTodo: builder.query({
            query: () => "/todos",
            providesTags: ['Todos']
        }),
        postTodo: builder.mutation({
            query: (todoData) => ({
                url: '/todos', 
                method: 'POST',
                body: {
                    data: todoData
                }, 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),
            
            invalidatesTags: ['Todos'] 
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
              url: `/todos/${id}`,
              method: 'DELETE',
              body: id
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (id) => ({
              url: `/todos/${id.id}`,
              method: 'PATCH',
              body: id
            }),
            invalidatesTags: ['Todos']
        }),
        addSubTasks: builder.mutation({
            query: (subtask) => ({
                url: `/todos/${subtask.id}/subtasks`,
                method: 'PATCH',
                body: subtask
            }),
            invalidatesTags: ['Todos']
        }),
        updateSubTasks: builder.mutation({
            query: (subtask) => ({
                url: `/todos/${subtask.TaskID}/${subtask.subID}`,
                method: 'PATCH',
                body: subtask,
            }),
            invalidatesTags: ['Todos']
        })
    }),
})
export const {usePostTodoMutation, useAddSubTasksMutation, useUpdateSubTasksMutation, useFetchTodoQuery, useDeleteTodoMutation, useUpdateTodoMutation } = apiSlice