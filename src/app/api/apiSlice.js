import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// since backend has verifyJWT as middleware 
// need to send token back to backend to verify identity
// must enable verifyJWT at backend so req.user can be set
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include', // send cookies
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})


// https://redux-toolkit.js.org/rtk-query/api/created-api/overview
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts
export const apiSlice = createApi({
    //  default is 'api'
    reducerPath: 'api',
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),

    baseQuery: baseQuery,
    // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
    tagTypes: ['Post'],

    // here the endpoints are empty but will be injected 
    // by postsApiSlice
    endpoints: builder => ({})
})