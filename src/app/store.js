import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

import authReducer from "../features/auth/authSlice"

// https://redux.js.org/tutorials/essentials/part-1-overview-concepts

// The store is created by passing in a reducer, 
// store.getState() returns current state value
// store.dispatch(action_object) is to send an action
// to corresponding reducer and update state

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // authReducer
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // enabling redux devTool
    devTools: true
})

// You can think of dispatching actions as "triggering an event"
// in the application.Something happened,
// nd we want the store to know about it.
// Reducers act like event listeners,
// and when they hear an action they are interested in,
// they update the state in response.