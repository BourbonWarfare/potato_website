/* eslint-disable no-underscore-dangle */
import { Button, Card, Form } from 'antd';
// import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
// import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getSinglePost, isProtected } from 'src/api/gets';
import { PostType } from 'src/types/PostType';
// import reactMarkdown from 'react-markdown';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import remarkGfm from 'remark-gfm';

import { newComment } from 'src/api/posts';

const Post = () => {
  const { category, id } = useParams();
  const [post, setPost] = React.useState<PostType>();
  const editorState = EditorState.createEmpty();
  const [editorText, setEditorText] = React.useState(editorState);

  React.useEffect(() => {
    const loadPost = async () => {
      const response = await getSinglePost(id, category);
      console.log('response from Post: ', response);
      setPost(response);
    };
    loadPost();
  }, []);

  const handleTitle = (author: string) => {
    return (
      <a href={`/u/${author}`} style={{ color: 'black' }}>
        {author}
      </a>
    );
  };

  const onEditorTextChange = (e: any) => {
    setEditorText(e);
  };

  const convert = (text: string) => {
    const converted = EditorState.createWithContent(
      convertFromRaw(JSON.parse(text)),
    );

    return draftToMarkdown(convertToRaw(converted.getCurrentContent()));
  };

  const onCommentFinish = async (e: any) => {
    const username = await isProtected();
    newComment({
      postId: id,
      category,
      author: username.data,
      body: e.text,
    });
  };

  return (
    <>
      {post && (
        <Card title={post.title}>
          {/* <div style={{ margin: '10px' }}>{post.text}</div> */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {convert(post.text)}
          </ReactMarkdown>
          <div>{`Posted by ${post.author.username}`}</div>
        </Card>
      )}
      <Card>
        <Form
          name="submitComment"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onCommentFinish}
          autoComplete="off"
        >
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
              Post Comment
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <h4>Comments</h4>
      {post &&
        post.comments &&
        post?.comments.map((comment) => {
          return (
            <Card title={handleTitle(comment.author.username)} key={comment.id}>
              {/* <div>{comment.body}</div> */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {convert(comment.body)}
              </ReactMarkdown>
            </Card>
          );
        })}
    </>
  );
};

export default Post;
