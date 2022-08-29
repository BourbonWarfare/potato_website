import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import Password from 'antd/lib/input/Password';
import React from 'react';
import { isProtected } from 'src/api/gets';
import { userLogin } from 'src/api/posts';
import UserContext from './UserContext';

const SignIn = ({ setIsAuth }: any) => {
  const onFinish = async (values: any) => {
    const data = await userLogin(values);
    console.log('data: ', data);
    if (data.response && data.response.statusText === 'Not Found') {
      message.error('Credentials not accepted');
      return setIsAuth(false);
    }
    if (data && data.status === 201) {
      return setIsAuth(true);
    }
    return null;
  };

  // const checkAuth = async () => {
  //   const check =
  //   isProtected();

  //   if (check !== http)
  // }

  // React.useEffect(() => {
  //   const checkAuth = async () => {
  //     const response = await isProtected();
  //     console.log('check auth response: ', response);
  //     if (response !== 403 && response !== 404) {
  //       console.log('session found');
  //       setIsAuth(true);
  //     } else {
  //       console.log('no session');
  //       setIsAuth(false);
  //     }
  //     return response;
  //   };
  //   checkAuth();
  // }, []);

  return (
    <Row
      // type="flex"
      typeof="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col span={4}>
        <Card title="Sign in to BW">
          <Form onFinish={onFinish}>
            <Form.Item name="username">
              <Input placeholder="Enter Username" />
            </Form.Item>
            <Form.Item name="password">
              <Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
