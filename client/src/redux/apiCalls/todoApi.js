import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../utils/auth';

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: (headers, { getState }) => {
            // Add the token to the headers if available
            const token = getToken();
            console.log(token,'token')
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    tagTypes: ["Todos", 'User'],
    endpoints: (builder) => ({
        fetchTodo: builder.query({
            query: () => "tasks/myTasks",
            providesTags: ['Todos', 'User']
        }),
        postTodo: builder.mutation({
            query: (todoData) => ({
                url: 'tasks/todos',
                method: 'POST',
                body: {
                    todoData
                },
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),

            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `tasks/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (id) => ({
                url: `tasks/todos/${id.id}`,
                method: 'PATCH',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
        addSubTasks: builder.mutation({
            query: (subtask) => ({
                url: `tasks/todos/${subtask.id}/subtasks`,
                method: 'PATCH',
                body: subtask
            }),
            invalidatesTags: ['Todos']
        }),
        updateSubTasks: builder.mutation({
            query: (subtask) => ({
                url: `/tasks/todos/${subtask.TaskID}/${subtask.subID}`,
                method: 'PATCH',
                body: subtask,
            }),
            invalidatesTags: ['Todos']
        }),
        postUser: builder.mutation({
            query: (userData) => ({
                url: 'auth/User',
                method: 'POST',
                body: {
                    data: userData
                },
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),

            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: 'auth/login',
                method: 'POST',
                body: {
                    data: userData
                },
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    // "Authorization": `Bearer `
                    
                }
            }),
            invalidatesTags: ['User']
        }),
        getUser: builder.mutation({
            query: (userData) => ({
                url: 'me/info',
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),
            invalidatesTags: ['User']
        }),
        isLoggedIn: builder.mutation({
            query: (userData) => ({
                url: 'auth/islogin',
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),
            invalidatesTags: ['User']
        }),
        isLoggedOut: builder.mutation({
            query: () => ({
                url: '/auth/logOut', 
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }),

            invalidatesTags: ['Todos'] 
        }),
    }),
})
export const { usePostTodoMutation, useIsLoggedOutMutation,useIsLoggedInMutation, useLoginUserMutation, useGetUserMutation, usePostUserMutation, useAddSubTasksMutation, useUpdateSubTasksMutation, useFetchTodoQuery, useDeleteTodoMutation, useUpdateTodoMutation } = apiSlice