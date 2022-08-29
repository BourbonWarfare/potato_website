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
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import { newPost } from 'src/api/posts';
import { isProtected } from 'src/api/gets';

const { TabPane } = Tabs;

const NewPost = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  // const [editorFancy, setEditorFancy] = React.useState<boolean>(true);
  const editorState = EditorState.createEmpty();
  const [editorText, setEditorText] = React.useState(editorState);
  const [tab, setTab] = React.useState('text');

  const tabsOnChange = (e: string) => {
    console.log('tab: ', e);
    return e === '1' ? setTab('text') : setTab('image');
  };

  const onFinish = async (e: any) => {
    // put api call here
    const username = await isProtected();
    console.log('form e: ', e);
    newPost({
      title: e.title,
      text: JSON.stringify(convertToRaw(editorText.getCurrentContent())) || '',
      type: tab,
      category,
      author: username.data,
      url: e.url || '',
    });
    navigate(`/c/${category}`);
  };

  const onEditorTextChange = (e: any) => {
    setEditorText(e);
    // console.log(
    //   'editor text: ',
    //   draftToHtml(convertToRaw(editorText.getCurrentContent())),
    // );
  };

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(`/c/${category}`)}
        title="New Post"
      />
      <Card>
        <Tabs defaultActiveKey="1" onChange={tabsOnChange}>
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
                  <Editor
                    editorState={editorText}
                    onEditorStateChange={onEditorTextChange}
                    toolbar={{
                      inline: {
                        options: ['bold', 'italic', 'strikethrough'],
                      },
                    }}
                    editorStyle={{
                      border: '1px solid',
                      borderColor: '#d9d9d9',
                    }}
                  />
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
