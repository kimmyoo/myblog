import { apiSlice } from "app/api/apiSlice";
// import { createEntityAdapter } from "@reduxjs/toolkit";
// const usersAdapter = createEntityAdapter({})
// const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserProfileInfo: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
            }),
            validateStatus: (response, result) => {
                // this response.status always returns 200
                // so must check result.isError
                return response.status === 200 && !result.isError
            },

            providesTags: (result, error, id) => [{ type: 'User', id }],

        }),


    })
})


export const { useGetUserProfileInfoQuery } = usersApiSlice

// export const selectUserResult = usersApiSlice.endpoints.getUserProfileInfo.select()


// const selectUserData = createSelector(
//     selectUserResult,
//     userResult => userResult.data
// )

// export const {
//     selectById: selectUserById,
// } = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)