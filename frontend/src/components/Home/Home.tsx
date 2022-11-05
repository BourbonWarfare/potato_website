import { ArrowsAltOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import React from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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

  const convert = (text: string) => {
    const converted = EditorState.createWithContent(
      convertFromRaw(JSON.parse(text)),
    );

    return draftToMarkdown(convertToRaw(converted.getCurrentContent()));
  };
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
                {/* <div>{post.text}</div> */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  // eslint-disable-next-line react/no-children-prop
                  children={convert(post.text)}
                  components={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    code({ inline, className, children }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter language={match[1]}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                  }}
                />
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
