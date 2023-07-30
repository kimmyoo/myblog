import { useGetUserPostsQuery } from "./postsApiSlice"
import PostCard from "./PostCard"

const PostsList = () => {
    // this Query is called immediately in component
    const {
        data: usersPosts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserPostsQuery()
    // posts is an object {ids:[....], entities: {.....}}
    // console.log(posts)
    let content = null
    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        const { ids } = usersPosts
        // only pass in postId
        // console.log(usersPosts)
        const postCards = ids?.length
            ? ids.map(postId => <PostCard key={postId} postId={postId} />)
            : <p>no posts yet</p>

        content = (
            <div>
                {postCards}
            </div>
        )
    }

    return (
        <div className="postList-wrapper">
            <h2>All Posts</h2>
            {content}
        </div>
    )
}

export default PostsList