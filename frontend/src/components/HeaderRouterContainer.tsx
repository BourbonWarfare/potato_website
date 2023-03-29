import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import Layout, { Content } from 'antd/lib/layout/layout';
import { Menu } from 'antd';
import '../index.css';
import Sider from 'antd/lib/layout/Sider';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  BookOutlined,
} from '@ant-design/icons';
import UserContext from 'src/UserContext';

const getItem = (
  label: string,
  key: string,
  icon?: ReactElement,
  children?: any,
) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem('Welcome', 'welcome', <FileOutlined />, [
    getItem('News and Announcements', 'news'),
    getItem('About BW', 'about'),
  ]),
  getItem('Arma', 'arma', <PieChartOutlined />, [
    getItem('General', 'general'),
    getItem('After Action Reports', 'aar'),
  ]),
  getItem('Members Lounge', 'members', <DesktopOutlined />, [
    getItem('Leadership and Pilot Program', 'leadAndPilot'),
    getItem('Recruit Review', 'recruitReview'),
    getItem('Mod Discussion', 'modDiscussion', <PieChartOutlined />, [
      getItem('Accepted Mods', 'acceptedMods'),
      getItem('Rejected Mods', 'rejectedMods'),
    ]),
  ]),
  getItem('Mission Making', 'missionMaking', <PieChartOutlined />, [
    getItem('Mission DB/Testing', 'missionDBTesting'),
  ]),
  getItem('Staff Forum', 'staffForum', <PieChartOutlined />, [
    getItem('Staff Archive', 'staffArchive', <PieChartOutlined />, [
      getItem('Case File Archive', 'caseFile'),
      getItem('Denied Recruit Applications', 'deniedApps'),
      getItem('Accepted Recruit Applications', 'acceptedApps'),
      getItem('General Archive', 'generalArchive'),
    ]),
  ]),
  getItem('Documents', 'docs', <BookOutlined />, [
    getItem('Recruit Handbook', 'handbook'),
    getItem('Leadership Discussion', 'leadDiscuss'),
    getItem('Mission Documentation', 'missionDocs'),
    getItem('Orientation / DB docs', 'orientDocs'),
  ]),
  getItem('Profile', 'profile'),
];

interface Props {
  children: React.ReactNode;
}

const HeaderRouterContainer = ({ children }: Props) => {
  const navigate = useNavigate();
  const user = React.useContext(UserContext);
  const [current, setCurrent] = React.useState(user?.menuKey);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLeftClick = (e: any) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        user?.setMenuKey('home');
        navigate('/');
        break;
      case 'untested':
      case 'tested':
      case 'played':
        user?.setMenuKey(`${e.key}`);
        navigate(`/m/${e.key}`);
        break;
      case 'handbook':
      case 'leadDiscuss':
      case 'missionDocs':
      case 'orientDocs':
        user?.setMenuKey(`${e.key}`);
        navigate(`/d/${e.key}`);
        break;
      case 'profile':
        user?.setMenuKey(`profile`);
        navigate(`/profile`);
        break;
      default:
        user?.setMenuKey(`${e.key}`);
        navigate(`/c/${e.key}`);
        break;
    }
  };

  const onCollapse = (collapse: any) => {
    console.log(collapse);
    setCollapsed(collapse);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {/* <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}> */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleLeftClick}
          selectedKeys={[current]}
          items={items}
        />
        {/* <Menu.Item key="general">General</Menu.Item>
          <Menu.Item key="missions">Mission Making</Menu.Item>
          <Menu.Item key="announcements">Announcements</Menu.Item>
        </Menu> */}
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Work Order Generator ©2022 Created by Toapaz Communications
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default HeaderRouterContainer;
