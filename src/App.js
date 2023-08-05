import { Routes, Route } from 'react-router-dom'
import Layout from 'components/Layout';
import DashLayout from 'components/DashLayout';
import HomePage from 'scenes/homePage';
import Login from 'features/auth/Login';

import ProfilePage from 'features/users/ProfilePage';
import EditProfile from 'features/users/EditProfile';

import PostsList from 'features/posts/PostsList';
import CreatePost from 'features/posts/CreatePost';
import EditPost from 'features/posts/EditPost';
import SearchPost from 'features/posts/SearchPost';
import SinglePost from 'features/posts/SinglePost';
import AutoScrollTop from 'components/AutoScrollTop';

function App() {
  return (
    <div className="app">
      <AutoScrollTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />

            <Route path="profile-dash" element={<DashLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path="edit-profile" element={<EditProfile />} />

              <Route path="posts">
                <Route index element={<PostsList />} />
                <Route path='new' element={<CreatePost />} />
                <Route path='search' element={<SearchPost />} />
                <Route path=':postId'>
                  <Route index element={<SinglePost />} />
                  <Route path='edit' element={<EditPost />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AutoScrollTop>
    </div>
  );
}

export default App;
