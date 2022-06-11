import React from 'react';
// import { css } from '@emotion/react';
// import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';
// import styled from 'styled-components';
// import usePostService from './hooks/usePostService';
// import { Post } from './types/Post';
import './App';
// import Dashboard from './components/Dashboard/PostListContainer';
// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
import Home from './components/Home/Home';
// import GlobalStyle from './globalStyle';
// import theme from './theme';
import HeaderRouterContainer from './components/HeaderRouterContainer';
import Category from './components/PostList/Category';
import Post from './components/Post/Post';
import UserProfile from './components/User/UserProfile';
import Missions from './components/MissionTesting/Missons';
// import TestedMissions from './components/MissionTesting/TestedMissions';
// import PlayedMissions from './components/MissionTesting/PlayedMissions';
// import UntestedMissions from './components/MissionTesting/UntestedMissions';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import history from './util/history';
// import GlobalStyle from './globalStyle';
// import Dashboard from './components/Dashboard/Dashboard';
// import Header from './components/Header/Header';

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const List = styled.ul`
//   list-style: none;
//   border: 1px solid;
//   border-radius: 2px;

//   @media (max-width: 768px) {
//     border-top: none;
//     border-left: none;
//     border-right: none;
//     border-radius: 0;
//   }
// `;

// const Item = styled.li`
//   :not(:first-child) {
//     border-top: 1px solid;
//   }
// `;

// const Wrapper = styled.div`
//   display: flex;
//   height: auto;
//   background-color: #282c34;
// `;

// userprofile needs some info
// comments and posts tabs and an overview with both posts and comments
// biography?
// age?
// email contact?
// dm?
// last active?
const App: React.FC = () => {
  // return <Home />;
  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <HeaderRouterContainer>
        <Routes>
          {/* <Route path="/new" element={<WorkOrder />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/c/:category" element={<Category />} />
          <Route path="/u/:username" element={<UserProfile />} />
          <Route path="/c/:category/:id" element={<Post />} />
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

          {/* add user page for selecting form elements */}
        </Routes>
      </HeaderRouterContainer>
    </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
