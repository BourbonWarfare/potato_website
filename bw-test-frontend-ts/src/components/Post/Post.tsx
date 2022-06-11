/* eslint-disable no-underscore-dangle */
import { Button, Card } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from 'src/api/gets';
import { PostType } from 'src/types/PostType';

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

  return (
    <>
      <div>Post</div>
      {post && (
        <Card title={post.title}>
          <div style={{ margin: '10px' }}>{post.text}</div>
          <div>{`Posted by ${post.author.username}`}</div>
        </Card>
      )}
      <Button>Add Comment</Button>
      <h4>Comments</h4>
      {post &&
        post.comments &&
        post?.comments.map((comment) => {
          return (
            <Card title={handleTitle(comment.author.username)} key={comment.id}>
              <div>{comment.body}</div>
            </Card>
          );
        })}
    </>
  );
};

export default Post;
