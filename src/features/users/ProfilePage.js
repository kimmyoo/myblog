import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import { nanoid } from "nanoid"
import { useGetUserProfileInfoQuery } from "./usersApiSlice"


const ProfilePage = () => {
  const { userId, username, email } = useAuth()
  const { data: userInfo, isLoading } = useGetUserProfileInfoQuery(userId)

  const created = new Date(userInfo?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  let content
  if (!isLoading) {
    content = (
      <div className="profile-dash-wrapper grid">
        <div className="grid-item">
          <h4>Profile Details</h4>
          <br />
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <p>Account created: {created}</p>
          <p><Link to="/profile-dash/edit-profile"><button>Edit Profile</button></Link></p>
        </div>

        <div className="grid-item">
          <h4>Summary of Posts</h4>
          <br />
          <p>Total number of posts: {userInfo?.numOfposts}</p>
          <ul>
            {userInfo?.categories?.map(category => <li key={nanoid()}>{category._id}: {category.count} posts</li>)}
          </ul>
        </div>
      </div>
    )
  } else {
    content = <p>Loading...</p>
  }


  return (
    content
  )
}

export default ProfilePage