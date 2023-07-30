import { apiSlice } from "app/api/apiSlice";
import { logOut } from "./authSlice";

// in axios, 需要在每个相应的功能页面里写 endpoint
// rtk query 是集中的写在一起 并通过injectEndpoints 
// 汇集到 apiSlice.js里面
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // login endpoing returns the access token
        login: builder.mutation({
            // credentials as argument 
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        sendLogout: builder.mutation({
            // no argument for logout
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // make sure backend query is fulfilled 
                    // before we actually dispatch logOut() to set token to null
                    // or reset state. 
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        }),
    })
})


// hooks
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice