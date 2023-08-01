import { Link } from "react-router-dom"

const HomePage = () => {
    const content = (
        <>
            <header className="navbar">
                <h2>BLOG+雜記</h2>
            </header>
            <main>
                <div className="landing-page">
                    
                    <Link to="/login"><h3>登录</h3></Link>
                    <h3>只有自己一个人的朋友圈...</h3>
                </div>
            </main>
        </>
    )
  return (
    content
  )
}

export default HomePage