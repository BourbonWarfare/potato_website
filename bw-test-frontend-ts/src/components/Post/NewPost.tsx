import { FileImageOutlined, FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  PageHeader,
  Space,
  Tabs,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const NewPost = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const onFinish = (e: any) => {
    // put api call here
    console.log('form e: ', e);
  };

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(`/c/${category}`)}
        title="New Post"
      />
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Text
              </span>
            }
            key="1"
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <Form
                name="submitTextPost"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name="title">
                  <Input placeholder="title" />
                </Form.Item>
                <Form.Item name="text">
                  <TextArea rows={10} placeholder="Text(optional)" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileImageOutlined />
                Image
              </span>
            }
            key="2"
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <Form
                name="submitURLPost"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name="title">
                  <Input placeholder="title" />
                </Form.Item>
                <Form.Item name="url">
                  <Input placeholder="URL" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default NewPost;
