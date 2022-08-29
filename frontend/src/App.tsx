import React from 'react';
import './App.css';
import './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Button } from 'antd';
// import cookie, { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';
import { withCookies } from 'react-cookie';
import Home from './components/Home/Home';
import HeaderRouterContainer from './components/HeaderRouterContainer';
import Category from './components/PostList/Category';
import Post from './components/Post/Post';
import UserProfile from './components/User/UserProfile';
import Missions from './components/MissionTesting/Missons';
import Document from './components/Documents/Document';
import NewPost from './components/Post/NewPost';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
import { isProtected } from './api/gets';
import InternalServerError from './components/Errors/InternalServerError';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isDown, setIsDown] = React.useState(false);
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('connect-sid');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // checks headers to see if session cookie is present
  React.useEffect(() => {
    const checkAuth = async () => {
      const response = await isProtected();
      switch (response) {
        case 403:
        case 404:
          setIsAuth(false);
          break;
        case 500:
          setIsDown(true);
          setIsAuth(false);
          break;
        default:
          setIsAuth(true);
      }
      return response;
    };
    checkAuth();
  }, []);

  if (isAuth && !isDown) {
    return (
      <BrowserRouter>
        <HeaderRouterContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/c/:category" element={<Category />} />
            <Route path="/u/:username" element={<UserProfile />} />
            <Route path="/c/:category/:id" element={<Post />} />
            <Route path="/d/:document" element={<Document />} />
            {/* <Route
              path="/m/:untested"
              element={<Missions missionType="untested" />}
            />
            <Route
              path="/m/:tested"
              element={<Missions missionType="tested" />}
            />
            <Route
              path="/m/:played"
              element={<Missions missionType="played" />}
            /> */}
            {/* <Route path="/m/:untested" element={<UntestedMissions />} />
            <Route path="/m/:tested" element={<TestedMissions />} />
            <Route path="/m/:played" element={<PlayedMissions />} /> */}
            <Route path="/m/:missionType" element={<Missions />} />
            <Route path="/c/:category/submit" element={<NewPost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </HeaderRouterContainer>
      </BrowserRouter>
    );
  }

  if (isDown) {
    return <InternalServerError />;
  }

  return <SignIn setIsAuth={setIsAuth} />;
};

export default withCookies(App);
