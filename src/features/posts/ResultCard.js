import { useSelector } from "react-redux"
import { selectPostById } from "./postsApiSlice"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

const ResultCard = ({ postId, keyword }) => {
    const post = useSelector(state => selectPostById(state, postId))
    let content
    if (post) {
        const created = new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

        let contentToDisplay = null
        let titleToDisplay = null

        const matchInContent = post.content?.toLowerCase().indexOf(keyword)
        const matchInTitle = post.title?.toLowerCase().indexOf(keyword)
        console.log(matchInContent, matchInTitle)


        // note: must check if match >= 0
        // in javascript, -1 is truthy value
        if (matchInContent >= 0) {
            const preKeywordContent = post.content.slice((matchInContent - 80) < 0 ? 0 : matchInContent - 80, matchInContent)
            const postKeywordContent = post.content.slice(matchInContent + keyword.length, (matchInContent + 100) < post.content.length ? matchInContent + 100 : post.content.length - 1)
            const middle = `<span class="matching">${post.content.slice(matchInContent, matchInContent + keyword.length)}</span>`
            contentToDisplay = preKeywordContent + middle + postKeywordContent
            // contentToDisplay = post.content.slice((matchInContent - 80) < 0 ? 0 : matchInContent - 80, (matchInContent + 100) < post.content.length ? matchInContent + 100 : post.content.length - 1)
        } else {
            contentToDisplay = post.content.slice(0, 300)
        }
        // check if title has a match
        if (matchInTitle >= 0) {
            titleToDisplay = <span className="matching">{post.title}</span>
        } else {
            titleToDisplay = post.title
        }

        content = (
            <Link to={`/profile-dash/posts/${postId}`}>
                <div className="post-card">
                    <h4>
                        Title: {titleToDisplay}
                        {post.isPrivate && <small> &#12953;</small>}
                    </h4>
                    <p
                        dangerouslySetInnerHTML={{ __html: contentToDisplay?.concat('...') }}
                    >
                    </p>
                    {
                        post.tags
                            ?
                            <p>
                                Tags: {post.tags.map(tag => {
                                    if (tag.includes(keyword)) { return <span key={nanoid()} className="matching" >#{tag} </span> }
                                    else {
                                        return <span key={nanoid()}>#{tag} </span>
                                    }
                                })}
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

export default ResultCard