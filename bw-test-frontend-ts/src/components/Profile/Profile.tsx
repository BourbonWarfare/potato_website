import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import React from 'react';

const Profile = () => {
  const { logout } = useAuth0();
  // logout({ returnTo: 'http://localhost:3000' });
  return (
    <>
      <div>Profile</div>
      <Button
        type="primary"
        onClick={() => logout({ returnTo: 'http://localhost:3000' })}
      >
        Logout
      </Button>
    </>
  );
};

export default Profile;
