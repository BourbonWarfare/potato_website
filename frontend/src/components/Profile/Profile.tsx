// import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { userLogout } from 'src/api/gets';
// import { authCheck } from 'src/api/posts';

const Profile = () => {
  // const { logout } = useAuth0();
  // const navigate = useNavigate();
  // logout({ returnTo: 'http://localhost:3000' });
  const onUserLogin = async () => {
    // const response = await userLogin(
    //   '623df90a5956a946f91c1739',
    //   'testpassword',
    // );
    // console.log('response from onUserLogin: ', response);
  };

  const onAuthCheck = async () => {
    // const response = await authCheck(
    //   '623df90a5956a946f91c1739',
    //   'testpassword',
    // );
    // console.log('response from onAuthLogin: ', response);
  };

  const onUserLogout = async () => {
    console.log('logout clicked');
    await userLogout();
    // console.log('onUserLogout response: ', response);
  };

  return (
    <>
      <div>Profile</div>
      <Button type="primary" onClick={onUserLogout}>
        Logout
      </Button>
      <Button type="primary" onClick={onUserLogin}>
        User Login
      </Button>
      <Button type="primary" onClick={onAuthCheck}>
        Auth Login
      </Button>
    </>
  );
};

export default Profile;
