import { useSelector } from "react-redux"
import { selectPostById } from "./postsApiSlice"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

const PostCard = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    let content
    if (post) {
        const created = new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        content = (
            <Link to={`/profile-dash/posts/${postId}`}>
                <div className="post-card">
                    <h4>
                        Title: {post.title}
                        {post.isPrivate && <small> &#12953;</small>}
                    </h4>
                    <p
                        dangerouslySetInnerHTML={{ __html: post.content.slice(0, 350).concat('...') }}
                    >

                    </p>
                    {
                        post.tags
                            ?
                            <p>
                                Tags: {post.tags.map(tag => <span key={nanoid()}>#{tag} </span>)}
                            </p>
                            : null
                    }
                    <p className="right">category: {post.category}</p>
                    <p className="right">Date Added: {created}</p>
                    <hr />
                </div>
            </Link >
        )
    } else {
        content = null
    }

    return (
        content
    )
}

export default PostCard