import { useState } from "react"
import useDebounce from "hooks/usedebounce"
import SearchResult from "./SearchResult"
import { useGetUserPostsQuery } from "./postsApiSlice"


const SearchPost = () => {
    const [keyword, setKeyword] = useState("")
    const [option, setOption] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const { val, opt } = useDebounce(keyword, option, 500)

    const {
        isSuccess,
    } = useGetUserPostsQuery()


    // console.log(val, opt)
    const handleKeywordChange = (e) => {
        if (!option) setErrMsg("select a field first")
        else {
            if (option === 'tags') {
                setKeyword(e.target.value.trim())
            } else {
                setKeyword(e.target.value)
            }

        }
    }


    const handleSelectChange = (e) => {
        setOption(e.target.value)
        setErrMsg("")
    }

    let content

    if (isSuccess) {
        content = (
            <div className="postList-wrapper">
                <h2>Searching '{keyword}'</h2>
                <p className="center">{errMsg}</p>
                <h2>
                    <select onChange={handleSelectChange}>
                        <option value="">Select Search Field</option>
                        <option value="posts">Posts</option>
                        <option value="tags">Tags</option>
                    </select>
                    <input
                        type="text"
                        onChange={handleKeywordChange}
                    />
                </h2>
                <h3>Results:</h3>
                {
                    (val && opt) && <SearchResult searchTerm={val} option={opt} />
                }
            </div>
        )
    } else {
        content = <p>failed to load posts</p>
    }


    return (
        content
    )
}

export default SearchPost