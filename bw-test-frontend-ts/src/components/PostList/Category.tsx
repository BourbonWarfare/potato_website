/* eslint-disable no-underscore-dangle */
import { Button, Card, Layout, PageHeader, Space } from 'antd';
// import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryPosts } from 'src/api/gets';

// const postsMock = [];

// const mock = () => {
//   for (let i = 0; i < 10; i += 1) {
//     postsMock.push({
//       id: i,
//       title: `Post ${i}`,
//       content: `This is post ${i}`,
//     });
//   }
// };
// mock();

const handleTitle = (
  title: string,
  id: string,
  link?: string,
  category?: string,
) => {
  console.log('params: ', { title, id, link, category });
  return link ? (
    <div>
      <a
        style={{ margin: '0 10px 0 0', fontSize: '2em', color: 'black' }}
        href={`${category}/${id}`}
      >
        {title}
      </a>
      <a href={`https://${link}`}>{link}</a>
    </div>
  ) : (
    <a href={`${category}/${id}`}>{title}</a>
  );
};

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [posts, setPosts] = React.useState<any>([]);

  const handleNewPost = () => {
    navigate(`/c/${category}/submit`);
  };

  React.useEffect(() => {
    const loadData = async () => {
      const response = await getCategoryPosts(category);
      console.log('response: ', response);
      setPosts(response);
    };
    loadData();
    console.log('posts', posts);
  }, []);
  return (
    <Layout>
      <PageHeader className="site-page-header" title={category} />
      <Button
        type="primary"
        style={{ float: 'left', width: '100px' }}
        onClick={handleNewPost}
      >
        New Post
      </Button>
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
                  {/* <span style={{margin: '0 10px 0 0'}}>{`/c/${post.category}`}</span> */}
                  <span>Posted by {post.author.username}</span>
                </div>
              </Card>
            );
          })}
      </Space>
    </Layout>
  );
};

export default Category;
