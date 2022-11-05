// import { useAuth0 } from '@auth0/auth0-react';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { getUserInfo, userLogout } from 'src/api/gets';
// import UserContext from 'src/UserContext';
// import { authCheck } from 'src/api/posts';

const Profile = () => {
  const [formInstance] = Form.useForm();
  // const user = React.useContext(UserContext);
  const [user, setUser] = React.useState(undefined);
  // const [squadXML, setSquadXML] = React.useState(undefined);
  const onUserLogout = async () => {
    console.log('logout clicked');
    await userLogout();
    // navigate('/');
    window.location.reload();
  };
  React.useEffect(() => {
    const loadData = async () => {
      // eslint-disable-next-line prettier/prettier
      const response = await getUserInfo(localStorage.getItem('userID')!)
      console.log('response: ', response);
      setUser(response)
    }
    loadData();
  }, []);

  const onFinish = (values: any) => {
    console.log('values: ', values);
  };

  return (
    <>
      <div>Profile</div>
      <Button type="primary" onClick={onUserLogout}>
        Logout
      </Button>
      {console.log('user from profile: ', user)}
      {
        <Form
          name="changeUserPrefs"
          form={formInstance}
          onFinish={onFinish}
          style={{ width: '15vw' }}
          // initialValues={{
          //   squadXML: user?.squadXML,
          // }}
        >
          <Form.Item name="squadXML" label="Squad XML">
            <Input /> {/* need to get value from context */}
          </Form.Item>
        </Form>
      }
    </>
  );
};

export default Profile;
