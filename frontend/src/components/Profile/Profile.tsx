// import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { userLogout } from 'src/api/gets';
// import { authCheck } from 'src/api/posts';

const Profile = () => {
  const navigate = useNavigate();
  const onUserLogout = async () => {
    console.log('logout clicked');
    await userLogout();
    // navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div>Profile</div>
      <Button type="primary" onClick={onUserLogout}>
        Logout
      </Button>
    </>
  );
};

export default Profile;
