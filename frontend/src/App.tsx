import React, { lazy, Suspense } from 'react';
import './App.css';
import './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Button } from 'antd';
// import cookie, { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';
import { withCookies } from 'react-cookie';
import { Spin } from 'antd';
import HeaderRouterContainer from './components/HeaderRouterContainer';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
import { isProtected } from './api/gets';
import InternalServerError from './components/Errors/InternalServerError';
import UserContextProvider from './UserContextProvider';

const Home = lazy(() => import('./components/Home/Home'));
const Category = lazy(() => import('./components/PostList/Category'));
const Post = lazy(() => import('./components/Post/Post'));
const UserProfile = lazy(() => import('./components/User/UserProfile'));
const Missions = lazy(() => import('./components/MissionTesting/Missons'));
const Document = lazy(() => import('./components/Documents/Document'));
const NewPost = lazy(() => import('./components/Post/NewPost'));

const App: React.FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [isDown, setIsDown] = React.useState<boolean>(false);

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
      <UserContextProvider>
        <BrowserRouter>
          <HeaderRouterContainer>
            <Suspense fallback={<Spin tip="Loading..." size="large" />}>
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
            </Suspense>
          </HeaderRouterContainer>
        </BrowserRouter>
      </UserContextProvider>
    );
  }

  if (isDown) {
    return <InternalServerError />;
  }

  return (
    <UserContextProvider>
      <SignIn setIsAuth={setIsAuth} />
    </UserContextProvider>
  );
};

export default withCookies(App);
