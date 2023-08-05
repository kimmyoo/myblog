import { Link, useNavigate } from "react-router-dom"
import { useAddNewPostMutation } from "./postsApiSlice"
import { useState, useEffect } from "react"
import { CATEGORIES } from 'config/categories'
import { nanoid } from "nanoid"
import ReactQuill from 'react-quill'
import { quillStyle, modules } from "config/quillSetups"
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
    // this is not called immediately
    const [addNewPost, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPostMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    // if successfully completed the mutation query
    // navigate back to post list component
    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setCategory('')
            setTags([])
            setContent('')
            navigate('/profile-dash/posts')
        } else {
            console.log()
        }
    }, [isSuccess, navigate])


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    // const handleContentChange = (e) => {
    //     setContent(e.target.value)
    // }

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value
        setCategory(selectedCategory)
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

    const handleTagChange = (e) => {
        setTag(e.target.value.trim().toLowerCase())
    }

    const handleDeleteTag = (e) => {
        const tagToDel = e.target.getAttribute('value')
        // console.log(e.target.getAttribute('value'))
        setTags((tags) => tags.filter((tag) => tag !== tagToDel))
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

    // valid input
    const isNotEmpty = (field) => field.trim().length > 0
    const canSave = [title, content, category].every(isNotEmpty) && !isLoading

    const postData = {
        title,
        content,
        category,
        tags: tags ? tags : null,
        isPrivate
    }

    const handleSavePost = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewPost(postData)
        }
    }

    // use values list from object to form option choices
    const options = Object.values(CATEGORIES).map(category => {
        return (
            <option key={category} value={category}>{category}</option>
        )
    })


    // const quillStyle = {
    //     height: 300,
    //     borderRight: 'none',
    //     fontSize: '18px',
    //     backgroundColor: 'rgba(240, 255, 255, 0.486)',
    // };

    // const modules = {
    //     toolbar: [
    //         [{ 'header': [1, 2, false] }],
    //         [{ 'size': ['small', false, 'large', 'huge'] }],
    //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    //         ['link', 'image'],
    //         ['clean']
    //     ],
    // }

    return (
        <div className="post-wrapper">
            <h2>Add a New Post</h2>
            {isError && <p>{error?.data?.message}</p>}
            <form>
                <label htmlFor="title"><h4>Post Title*</h4></label>
                <p>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        onChange={handleTitleChange}
                    />
                </p>
                <label htmlFor="content"><h4>Content Editor*</h4></label>


                <div className="quill-wrapper">
                    <ReactQuill
                        theme="snow"
                        style={quillStyle}
                        modules={modules}
                        value={content}
                        onChange={setContent}
                    />
                </div>
                {/* <textarea
                    className="post-content"
                    name="content"
                    id="content"
                    onChange={handleContentChange}
                >
                </textarea> */}

                <label htmlFor="category">Category*</label>
                <select
                    name="category"
                    id="category"
                    onChange={handleCategoryChange}
                >
                    <option value="">Select</option>
                    {options}
                </select>

                <div onChange={handleIsPrivateChange}>
                    <input name="isPrivate" id="private" type="radio" value="true" defaultChecked={isPrivate === true} /> private
                    <input name="isPrivate" id="public" type="radio" value="false" defaultChecked={isPrivate === false} /> public
                </div>

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

export default CreatePost