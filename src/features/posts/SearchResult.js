import { useState, useEffect } from "react"
import { useSearchPostQuery } from "./postsApiSlice"
import ResultCard from "./ResultCard"

const SearchResult = ({ searchTerm, option }) => {
    const [filteredTerm, setFilteredTerm] = useState(searchTerm)
    const { data: searchResult, error, isError, isLoading, isFetching, isSuccess } = useSearchPostQuery({ filteredTerm, option })
    // console.log(filteredTerm, option)

    useEffect(() => {
        if (searchTerm === "" || searchTerm.length > 2) {
            setFilteredTerm(searchTerm?.toLowerCase())
        }
    }, [searchTerm])

    let content = null
    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isFetching) content = <p>fetching posts...</p>

    if (isSuccess) {
        const { ids } = searchResult
        // console.log(searchResult)
        const postCards = ids?.length
            ? ids.map(postId => <ResultCard keyword={filteredTerm} key={postId} postId={postId} />)
            : <p>no result found</p>

        content = (
            <div>
                {postCards}
            </div>
        )
    }

    return (
        <>
            {content}
            <p className="center">The End</p>
        </>
    )
}

export default SearchResult