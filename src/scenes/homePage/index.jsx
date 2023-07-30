import { Link } from "react-router-dom"

const HomePage = () => {
    const content = (
        <section>
            <header>
                <h2>My Blog</h2>
            </header>
            <main>
                自制pyq
                <Link to="/login"><h3>Login</h3></Link>
            </main>
        </section>
    )
  return (
    content
  )
}

export default HomePage