import { useState } from "react"
import { useUpdatePostMutation, useDeletePostMutation } from "./postsApiSlice"
import { CATEGORIES } from 'config/categories'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"

const EditPostForm = ({ post }) => {
    // console.log(post)
    const [updatePost, {
        isLoading,
        isError,
        error
    }] = useUpdatePostMutation()

    const [deletePost, {
        isError: isDelError,
        error: delError
    }] = useDeletePostMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [category, setCategory] = useState(post.category)
    const [tags, setTags] = useState(post.tags ? post.tags : [])
    const [tag, setTag] = useState('')
    const [isPrivate, setIsPrivate] = useState(post.isPrivate)


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value
        setCategory(selectedCategory)
    }

    const handleIsPrivateChange = (e) => {
        let selectedChoice = e.target.value
        // input tags value attribute must have text type
        if (selectedChoice === "true") {
            selectedChoice = true
        } else {
            selectedChoice = false
        }
        setIsPrivate(selectedChoice)
    }

    const handleTagChange = (e) => {
        setTag(e.target.value.trim().toLowerCase())
    }

    const handleEnterKeyPressed = (e) => {
        if (e.key === 'Enter') {
            // need to preventDefault() otherwise
            // form will be submitted
            e.preventDefault()
            if (tag.length > 0 && (!tags.includes(tag))) {
                setTags(
                    [...tags, tag]
                )
            }
            // reset tag to empty string
            setTag('')
        }
    }

    const handleDeleteTag = (e) => {
        const tagToDel = e.target.getAttribute('value')
        // console.log(e.target.getAttribute('value'))
        setTags((tags) => tags.filter((tag) => tag !== tagToDel))
    }


    // valid input
    const isNotEmpty = (field) => field.trim().length > 0
    const canSave = [post.id, title, content, category].every(isNotEmpty) && !isLoading

    const postData = {
        id: post.id,
        title,
        content,
        category,
        tags: tags ? tags : null,
        isPrivate
    }

    const handleSavePost = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updatePost(postData)
            // after query this the component rerenders
            // and enter loading state
            navigate('/profile-dash/posts')
        }
    }

    const handleDeletePost = async (e) => {
        e.preventDefault()
        await deletePost({ id: post.id })
        navigate('/profile-dash/posts')
    }

    const options = Object.values(CATEGORIES).map(category => {
        return (
            <option key={category} value={category}>{category}</option>
        )
    })


    const errContent = (error?.data?.message || delError?.data?.message) ?? ''

    return (
        <div className="post-wrapper">
            <h2>Edit Post: {title}</h2>
            {(isError || isDelError) && <p className="errMsg">{errContent}</p>}
            <form>
                <label htmlFor="title"><h4>Post Title*</h4></label>
                <p>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </p>
                <label htmlFor="content"><h4>Content*</h4></label>
                <textarea
                    name="content"
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                >
                </textarea>

                <label htmlFor="category">Category*</label>
                <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select</option>
                    {options}
                </select>

                <div onChange={handleIsPrivateChange}>
                    <input name="isPrivate" id="private" type="radio" value="true" defaultChecked={isPrivate === true} /> private
                    <input name="isPrivate" id="public" type="radio" value="false" defaultChecked={isPrivate === false} /> public
                </div>

                {/* <p>Tags: {tags?.map(tag => <span key={nanoid()}>{`#${tag} `}</span>)}</p> */}
                <p>
                    Tags: {tags
                        ?.map(tag => <span key={nanoid()} value={tag}>
                            {`#${tag} `}
                            <small
                                key={nanoid()}
                                value={tag}
                                onClick={handleDeleteTag}
                            >
                                &#10006;
                            </small>
                        </span>)}
                </p>


                <small>#</small>
                <input
                    name="tags"
                    type="text"
                    value={tag}
                    placeholder="press enter to add tag"
                    onChange={handleTagChange}
                    onKeyDown={handleEnterKeyPressed}
                />


                <p
                    className="right warning"
                    onClick={handleDeletePost}
                >
                    <button>Delete Post</button>
                </p>



                <p className="center">
                    <button
                        onClick={handleSavePost}
                        disabled={!canSave}
                    >Save</button>
                    <Link to="/profile-dash/posts"><button>Cancel</button></Link>
                </p>
            </form>
        </div>
    )
}

export default EditPostForm