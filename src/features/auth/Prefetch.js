import { store } from "app/store"
import { postsApiSlice } from "features/posts/postsApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"


const Prefetch = () => {
    useEffect(() => {
        console.log("subscribing")
        const posts = store.dispatch(postsApiSlice.endpoints.getUserPosts.initiate())

        return () => {
            console.log('unsubscribing')
            posts.unsubscribe()
        }
    }, [])
    return <Outlet />
}

export default Prefetch