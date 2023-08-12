import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="main">
            <h2>404 for you! Surprise~ supplies~~~ : ）<Link to="/login">go back</Link></h2>
            <div className="video-container">
                <iframe
                    name="video"
                    title="video"
                    src="https://www.youtube-nocookie.com/embed/pqU4g5iJk2Y?autoplay=1&mute=1&controls=1&showinfo=0&autohide=1"
                >
                </iframe>
            </div>
        </div>
    )
}

export default NotFound