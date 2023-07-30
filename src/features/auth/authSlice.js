import { createSlice } from "@reduxjs/toolkit";


// Redux Toolkit has a function called createSlice, 
// which takes care of the work of generating 
// action type strings, 
// action creator functions, 
// and action objects.
// All you have to do is define a name for this slice, 
// write an object that has some reducer functions in it, 
// and it generates the corresponding action code automatically.
const authSlice = createSlice({
    name: 'auth',

    initialState: { token: null },

    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload // data from api contains payload
            state.token = accessToken
        },

        logOut: (state, action) => {
            state.token = null
        }
    }
})

// once you define the reducers, 相应的actions
// authSlice.actions 由 Action Creator自动生成
// refer to login.js
export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer // need this in store.js

// selector 
export const selectCurrentToken = (state) => state.auth.token
// state is like a whole pizza pie
// authSlice is one of the pieces.
// the state.auth.token is selecting the token from the state.
