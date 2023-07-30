import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "app/api/apiSlice";

// {id: [....],  entities:{.....}}
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (b.createdAt.localeCompare(a.ceatedAt))
})

const initialState = postsAdapter.getInitialState()

// inject that to original apiSlice, 这就是为什么original apiSlice
// endpoints 是空的
export const postsApiSlice = apiSlice.injectEndpoints({

    // endpoints returns a function which returns an object 
    endpoints: builder => ({
        // get all user's posts
        getUserPosts: builder.query({
            query: () => "/posts/",
            validateStatus: (response, result) => {
                // this response.status always returns 200
                // so must check result.isError
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 3600,
            // transform data from mongodb  (._id) 
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    post.id = post._id
                    return post
                })
                // intitial state
                return postsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }]
            }
        }),

        // add new post
        addNewPost: builder.mutation({
            query: (initialPostData) => ({
                url: '/posts/',
                method: 'POST',
                body: {
                    ...initialPostData
                }
            }),

            invalidatesTags: [
                'Post'
                // { type: 'Post', id: 'LIST' }
            ]
        }),

        //edit a post mutation
        updatePost: builder.mutation({
            query: (updatedPostData) => ({
                url: '/posts/',
                method: 'PATCH',
                body: {
                    ...updatedPostData
                }
            }),

            invalidatesTags: [
                'Post'
                // { type: 'Post', id: 'LIST' }
            ]
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Post', id: arg.id }
            // ]
        })





    })
})




// useXXXQuery  hooks 
export const {
    useGetUserPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
} = postsApiSlice

// selectPostsResult contains query result
export const selectPostsResult = postsApiSlice.endpoints.getUserPosts.select()

// memoized selector, not exported for later use
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
