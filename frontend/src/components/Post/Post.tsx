/* eslint-disable no-underscore-dangle */
import { Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
// import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getSinglePost } from 'src/api/gets';
import { PostType } from 'src/types/PostType';
// import reactMarkdown from 'react-markdown';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import remarkGfm from 'remark-gfm';

const Post = () => {
  const { category, id } = useParams();
  const [post, setPost] = React.useState<PostType>();

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

  const convert = (text: string) => {
    const converted = EditorState.createWithContent(
      convertFromRaw(JSON.parse(text)),
    );

    return draftToMarkdown(convertToRaw(converted.getCurrentContent()));
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
        <TextArea rows={5} placeholder="Add Comment" />
        {/* // NEED MARKDOWN */}
        {/* <MdEditor style={{ height: '500px' }} renderHTML={(text) => }/> */}
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
