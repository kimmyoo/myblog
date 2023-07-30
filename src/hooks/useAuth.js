import { useSelector } from "react-redux";
import { selectCurrentToken } from "features/auth/authSlice";
// npm i jwt-decode
import jwtDecode from 'jwt-decode'



const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    if (token) {
        const decoded = jwtDecode(token)
        const { _id: userId, username, email } = decoded.userInfo

        return { userId, username, email }
    } else {
        return { username: "", email: "" }
    }

}

export default useAuth