import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSendLogoutMutation } from "features/auth/authApiSlice"


const DashHeader = () => {
    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate("/")
    }, [isSuccess, navigate])


    if (isLoading) return <p>logging out...</p>

    if (isError) return <p>Error: {error.message}</p>

    const logoutButton = (
        <p onClick={() => sendLogout()}>Log Out</p>
    )

    const content = (
        <header>
            <nav className="navbar">
                <div className="logo">雜 記</div>
                <ul className="nav-links">
                    <input type="checkbox" id="checkbox_toggle" />
                    <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
                    <div className="menu">
                        <Link to="/profile-dash"><li>Dashboard</li></Link>
                        <Link to="/profile-dash/posts"><li>All Posts</li></Link>
                        <Link to="/profile-dash/posts/new"><li>New Post</li></Link>
                        <Link to="/profile-dash/posts/search"><li>Search</li></Link>
                        <Link to="/login"><li>{logoutButton}</li></Link>
                    </div>
                </ul>
            </nav>
        </header>
    )
    return (
        content
    )
}

export default DashHeader