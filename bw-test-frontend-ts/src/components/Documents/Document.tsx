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
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Card title="Tab Card 1">You can put cards in tabs too</Card>
          <Card title="Tab Card 2">Decent way to organize material</Card>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Document;
