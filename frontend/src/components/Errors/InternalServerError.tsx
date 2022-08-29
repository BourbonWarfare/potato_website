import { Card, Row } from 'antd';
import React from 'react';

const InternalServerError = () => {
  return (
    <Row
      typeof="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Card title="Server is down" style={{ width: 600 }}>
        The server is down, please contact BW admins or wait until the error is
        fixed
      </Card>
    </Row>
  );
};

export default InternalServerError;
