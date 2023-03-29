/* eslint-disable no-underscore-dangle */
import {
  CommentOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, Layout, message, Space } from 'antd';
import {PageHeader} from '@ant-design/pro-layout';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryPosts } from 'src/api/gets';
// import InfiniteScroll from 'react-infinite-scroller';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
	
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


// import { draftToMarkdown } from 'markdown-draft-js';
const handleTitle = (
  title: string,
  id: string,
  username: string,
  created: Date,
  link?: string,
  category?: string,
) => {
  // console.log('params: ', { title, id, link, category });
  return link ? (
    <>
      <div>
        <a
          style={{ margin: '0 10px 0 0', fontSize: '1.5em', color: 'black' }}
          href={`${category}/${id}`}
        >
          {title}
        </a>
        <a href={`https://${link}`}>{link}</a>
      </div>
      <div style={{ fontSize: '1em', color: 'grey' }}>
        {/* <span style={{margin: '0 10px 0 0'}}>{`/c/${post.category}`}</span> */}
        {/* need to style this below */}
        {/* <span> */}
        {/* {`Posted by ${username} on ${moment(created).format('YYYY MM DD')}`} */}
        {`Posted by ${username} - ${moment(created).fromNow()}`}
        {/* </span> */}
      </div>
    </>
  ) : (
    <a style={{ margin: '0 10px 0 0', fontSize: '1.5em', color: 'black' }} href={`${category}/${id}`}>{title}</a>
  );
};

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [posts, setPosts] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(1);

  const handleNewPost = () => {
    navigate(`/c/${category}/submit`);
  };

  React.useEffect(() => {
    const loadData = async () => {
      const response = await getCategoryPosts(category, page);
      // console.log('response: ', response);
      setPage(page);
      setPosts(response);
    };
    loadData();
    // console.log('posts', posts);
  }, [category]);

  // const handleLoadMore = (nextPage) => {
  //   const response = getCategoryPosts(category, nextPage);
  //   return response;
  // };
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      // eslint-disable-next-line prettier/prettier
      document.scrollingElement!.scrollHeight
    ) {
      // Do load more content here!
      const loadData = async () => {
        const response = await getCategoryPosts(category, page);
        // console.log('response: ', response);
        setPage(page + 1);
        setPosts(response);
      };
      loadData();
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', loadMore);

    return () => window.removeEventListener('scroll', loadMore);
  }, []);

  // React.useEffect(() => {
  //   const loadData = async () => {
  //     const response = await getCategoryPosts(category, page);
  //     setPosts(response);
  //   };
  //   window.addEventListener('scroll', loadData);

  //   return () => window.removeEventListener('scroll', loadData);
  // });

  const convert = (text: string) => {
    const converted = EditorState.createWithContent(
      convertFromRaw(JSON.parse(text))
    );
    
    return draftToMarkdown(convertToRaw(converted.getCurrentContent()))
  }

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
        {posts.length > 0 ?
          posts
            .map((post: any) => {
              // console.log('parsed: ', convert(post.text))
              return (
                <Card
                  title={handleTitle(
                    post.title,
                    post._id,
                    post.author.username,
                    post.created,
                    post.url,
                    post.category,
                  )}
                  key={post._id}
                  actions={[
                    <CommentOutlined
                      key="comment"
                      onClick={() => navigate(`${post._id}`)}
                    />,
                    <ExportOutlined
                      key="share"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.href}/${post._id}`,
                        );
                        message.info(
                          `Copied post link: ${window.location.href}/${post._id}`,
                        );
                      }}
                    />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  {/* <div>{`${post.text.substring(0, 20)}...`}</div> */}
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    // eslint-disable-next-line react/no-children-prop
                    children={convert(post.text)}
                    components={{
                      // eslint-disable-next-line react/no-unstable-nested-components
                      code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </Card>
              );
            })
            .sort()
            .reverse()
            :
            <Empty description={<span>No Posts</span>}/>
            }
      </Space>
    </Layout>
  );
};

export default Category;
