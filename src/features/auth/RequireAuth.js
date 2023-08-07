import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";


// this component protects the routes that need protection
// if the user is not authenticated, they cannot even vist the route. 
const RequireAuth = () => {
    const location = useLocation()
    const { username, email, userId } = useAuth()

    let content
    // if (username && userId && email)
    // only I can have access basically.
    if (username.includes('jin19') && userId && email.includes('mmyoo')) {
        content = <Outlet />
    } else {
        content = <Navigate to="/login" state={{ from: location }} replace />
    }

    return (
        content
    )
}

export default RequireAuth