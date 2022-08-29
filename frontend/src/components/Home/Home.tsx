import { ArrowsAltOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import React from 'react';
// import { useParams } from 'react-router-dom';
import { getPosts } from 'src/api/gets';

const handleTitle = (
  title: string,
  id: string,
  link?: string,
  category?: string,
) => {
  return link ? (
    <div>
      <a
        style={{ margin: '0 10px 0 0', fontSize: '2em', color: 'black' }}
        href={`/c/${category}/${id}`}
      >
        {title}
      </a>
      <a href={`https://${link}`}>{link}</a>
    </div>
  ) : (
    <a href={`/c/${category}/${id}`}>{title}</a>
  );
};

const Home = () => {
  // const { category } = useParams();
  const [posts, setPosts] = React.useState<any>([]);

  React.useEffect(() => {
    // const data = authCheck('623df90a5956a946f91c1739', 'asdfasd');
    // console.log('authcheck data from home: ', data);
  }, []);

  React.useEffect(() => {
    const loadData = async () => {
      const response = await getPosts();
      console.log('response: ', response);
      setPosts(response);
    };
    loadData();
    console.log('posts', posts);
  }, []);
  return (
    <>
      <div>HOME</div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {posts &&
          posts.map((post: any) => {
            return (
              <Card
                title={handleTitle(
                  post.title,
                  post._id,
                  post.url,
                  post.category,
                )}
                key={post._id}
              >
                <div>{post.text}</div>
                <div>
                  <Button
                    href={`/c/${post.category}/${post._id}`}
                    icon={<ArrowsAltOutlined />}
                  >
                    Comments
                  </Button>
                  <span
                    style={{ margin: '0 10px 0 0' }}
                  >{`/c/${post.category}`}</span>
                  <span>Posted by {post.author.username}</span>
                </div>
              </Card>
            );
          })}
      </Space>
    </>
  );
};

export default Home;
