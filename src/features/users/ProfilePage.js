import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"

const ProfilePage = () => {
  const { username, email } = useAuth()
  return (
    <div>
      <h2>Profile Page</h2>
      <p>email: {email}</p>
      <p>username: {username}</p>
      <small><Link to="/profile-dash/edit-profile">Edit Profile</Link></small>
    </div>
  )
}

export default ProfilePage