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

        searchPost: builder.query({
            query: (arg) => {
                const { filteredTerm, option } = arg
                // console.log(filteredTerm, option)
                return {
                    url: `/posts/search?q1=${filteredTerm}&q2=${option}`,
                }
            },
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 3600,
            transformResponse: responseData => {
                const queriedPosts = responseData.map(post => {
                    post.id = post._id
                    return post
                })

                return postsAdapter.setAll(initialState, queriedPosts)
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
                'Post', 'User'
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
                'Post', 'User'
            ]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: '/posts/',
                method: 'DELETE',
                body: { id }
            }),

            invalidatesTags: ['Post']
        }),







    })
})




// useXXXQuery  hooks 
export const {
    useGetUserPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useSearchPostQuery,
} = postsApiSlice

// selectPostsResult contains query result
export const selectPostsResult = postsApiSlice.endpoints.getUserPosts.select()
export const selectSearchResult = postsApiSlice.endpoints.searchPost.select()

// memoized selector, not exported for later use
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

const selectSearchData = createSelector(
    selectSearchResult,
    searchResult => searchResult.data
)



export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)

export const {
    selectAll: selectAllResults,
    selectById: selectResultById,
} = postsAdapter.getSelectors(state => selectSearchData(state) ?? initialState)
