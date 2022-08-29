import { Card, Tabs } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from 'src/api/gets';
import { UserType } from 'src/types/UserType';

const { TabPane } = Tabs;

const UserProfile = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = React.useState<UserType>();

  React.useEffect(() => {
    const loadData = async () => {
      const response = await getUserInfo(username);
      console.log('response from userProfile: ', response);
      setUserInfo(response);
    };
    loadData();
  }, []);

  const handleTabChange = (key: string) => {
    console.log('tab key: ', key);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="Posts" key="1">
        {userInfo &&
          userInfo.posts.map((post) => {
            return <Card title={post.title}>{post.text}</Card>;
          })}
      </TabPane>
      <TabPane tab="Comments" key="2">
        {userInfo &&
          userInfo.comments.map((comment) => {
            return <Card>{comment.body}</Card>;
          })}
      </TabPane>
    </Tabs>
  );
};

export default UserProfile;
