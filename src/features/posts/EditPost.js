import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPostById } from "./postsApiSlice"
import EditPostForm from "./EditPostForm"



const EditPost = () => {
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, postId))

    let content
    if (post) { content = <EditPostForm post={post} /> }
    else { content = <h2>loading...</h2> }

    return (
        content
    )
}

export default EditPost

//  EditPost component is like a wrapper for
//  EditPostForm. the reason we need this wrapper is
//  useUpdatePostMutation() will re-render the component
//  where it resides. if we use EditPostForm only.
//  the rerender will cause the component to rerender
//  but the postId cannot be retrieved by useParams() yet
//  causing  post is undefined (selectById selector cannot retrive the post entity)
//  with this wrapper only the inner EditPostForm is rerendered
//  the props passed to it still exists and not changing. 