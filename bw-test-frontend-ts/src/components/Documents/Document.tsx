import { Card, Layout, Tabs } from 'antd';
import React from 'react';
// import { TabPane } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
const { TabPane } = Tabs;

const Document: React.FC = () => {
  // const { document } = useParams();

  const onTabChange = (key: string) => {
    console.log(`Tab key: ${key}`);
  };

  return (
    <Layout>
      <Card title="doc card 1">This is a card card</Card>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="Getting started" key="1">
          Welcome to BW!
        </TabPane>
        <TabPane tab="Mod Info" key="2">
          <Card title="Tab Card 1">
            Here&apos;s where you download arma3sync
          </Card>
          <Card title="Tab Card 2">
            Here&apos;s the thing to copy into arma 3 sync
          </Card>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Document;
