import React from 'react';
import './App.css';
import './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import HeaderRouterContainer from './components/HeaderRouterContainer';
import Category from './components/PostList/Category';
import Post from './components/Post/Post';
import UserProfile from './components/User/UserProfile';
import Missions from './components/MissionTesting/Missons';
import Document from './components/Documents/Document';

const App: React.FC = () => {
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
        </Routes>
      </HeaderRouterContainer>
    </BrowserRouter>
  );
};

export default App;
