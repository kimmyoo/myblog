import { useSelector } from "react-redux"
import { selectPostById } from "./postsApiSlice"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

const SinglePost = () => {
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    // console.log(post)
    let content = null
    if (post) {
        const created = new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        const updated = new Date(post.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        content =
            <section className="post-wrapper">
                <Link to="/profile-dash/posts">
                    <button>&#129064;Back</button>
                </Link>
                <h2>{post.title}</h2>
                <article>
                    <h4 className="right">Created: {created}</h4>

                    <p className="post-content">{post.content}</p>
                    <hr />
                    {
                        post.tags
                            ?
                            <p>
                                Tags: {post.tags.map(tag => <span key={nanoid()}>#{tag} </span>)}
                            </p>
                            : null
                    }
                    <p className="right"><Link to='edit'><button>Edit</button></Link></p>
                    <h4 className="right">Updated: {updated}</h4>
                </article>
            </section>
    }

    return (
        content
    )
}

export default SinglePost