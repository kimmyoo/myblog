import { Link } from "react-router-dom"

const HomePage = () => {
    const content = (
        <>
            <header className="navbar">
                <h2>BLOG+雜記</h2>
                <Link to="/login"><h3>Login</h3></Link>
            </header>
            <main>
                <div className="video-container">
                    <iframe
                        name="video"
                        title="video"
                        src="https://www.youtube-nocookie.com/embed/vH4GIFiXJkM?autoplay=1&mute=1&controls=1&showinfo=0&autohide=1"
                    >
                    </iframe>
                </div>
            </main>
        </>
    )
  return (
    content
  )
}

export default HomePage