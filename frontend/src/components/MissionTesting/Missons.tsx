import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getMissions } from 'src/api/gets';
import { moveMissionsBackward, moveMissionsForward } from 'src/api/patches';

// type MissionType = {
//   missionType: string,
// };

type ParamTypes = {
  missionType: string,
};

const Missions: React.FC = () => {
  const { missionType } = useParams<ParamTypes>();
  const [posts, setPosts] = React.useState<any>([]);

  const handleForwardClick = async (id: string) => {
    console.log('clicked: ', id);
    await moveMissionsForward(id, missionType);
  };

  const handleBackwardClick = async (id: string) => {
    await moveMissionsBackward(id, missionType);
  };

  const handleTitle = (title: string, id: string, postCategory: string) => {
    return (
      <div>
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          onClick={() => handleBackwardClick(id)}
        />
        <Button
          shape="circle"
          icon={<CheckOutlined />}
          onClick={() => handleForwardClick(id)}
        />
        <a href={`${postCategory}/${id}`}>{title}</a>
      </div>
    );
  };

  React.useEffect(() => {
    const loadData = async () => {
      // debugger;
      let response;
      if (missionType === 'untested') {
        response = await getMissions('untested');
      } else if (missionType === 'tested') {
        response = await getMissions('tested');
      } else {
        response = await getMissions('played');
      }
      // const response = await getMissions('untested');
      console.log('response: ', response);
      setPosts(response);
    };
    loadData();
    console.log('posts: ', posts);
  }, []);
  return (
    <>
      <div>{missionType}</div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {posts &&
          posts.map((post: any) => {
            return (
              <Card
                title={handleTitle(post.title, post._id, post.category)}
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
    </>
  );
};

export default Missions;
