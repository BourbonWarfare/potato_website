import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
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
// need to find all categories

// const olditems = [
//   getItem('News & Announcements', 'news', <FileOutlined />, [
//     getItem('New', 'new'),
//     getItem('Community Events', 'events'),
//   ]),
//   getItem('Arma', 'arma', <PieChartOutlined />, [
//     getItem('Getting Started', 'gettingStarted'),
//     getItem('ArmA General', 'armaGeneral', <PieChartOutlined />, [
//       getItem('Intel', 'intel'),
//     ]),
//     getItem('Mission Making', 'missionMaking', <PieChartOutlined />, [
//       getItem('Finished Missions', 'finishedMissions'),
//       getItem('Mission Archives', 'archivedMissions'),
//       getItem('Repeat Mission Archives', 'repeatMissions'),
//     ]),
//     getItem('After Action Reports', 'aar'),
//     getItem("Member's Only Lounge", 'membersLounge', <PieChartOutlined />, [
//       getItem('Leadership and Pilot Program', 'leaderPilot'),
//       getItem('Recruit Review', 'recruitReview'),
//       getItem('Mod Discussion', 'modDiscuss', <PieChartOutlined />, [
//         getItem('Accepted Mods', 'acceptedMods'),
//         getItem('Rejected Mods', 'rejectedMods'),
//       ]),
//       getItem('Member Spotlight', 'memberSpot'),
//     ]),
//   ]),
//   getItem('Staff Forum', 'staffForum', <DesktopOutlined />, [
//     getItem('Staff Archive', 'staffArchive', <PieChartOutlined />, [
//       getItem('Case File Archive', 'caseFile'),
//       getItem('Denied Recruit Applications', 'denied'),
//       getItem('Accepted Recruit Applications', 'accepted'),
//       getItem('Leadership & LOA Archive', 'leadAndLOA', <PieChartOutlined />, [
//         getItem('Upcoming Abscenses / MIAs Archive', 'abscenseAndMIA'),
//       ]),
//       getItem('General Archive', 'generalArchive', <PieChartOutlined />, [
//         getItem('Other Games Archive', 'otherGames', <PieChartOutlined />, [
//           getItem('RPG Night', 'rpgNight'),
//           getItem('Naval Action', 'navalAction'),
//           getItem('Pathfinder', 'pathfinder'),
//         ]),
//       ]),
//       getItem('Documentation Rewrite', 'docRewrite'),
//     ]),
//     getItem('Administration Forum', 'adminForum'),
//   ]),
//   getItem('General', 'general', <DesktopOutlined />, [
//     getItem('Other Games', 'otherGames'),
//     getItem('Off Topic', 'offTopic'),
//     getItem('Videos and Screenshots', 'vidAndScreen'),
//     getItem("Upcoming Abscenses/MIA's", 'upcomingAbsAndMIA'),
//   ]),
//   getItem('Archives', 'archives', <UserOutlined />, [
//     getItem('BW Archive', 'bwArchive', <PieChartOutlined />, [
//       getItem('REDFOR Archive', 'redArchive', <PieChartOutlined />, [
//         getItem('REDFOR Archive', 'redArchive2'),
//       ]),
//     ]),
//   ]),
// ];

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
];

const HeaderRouterContainer: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState('home');
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLeftClick = (e: any) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'untested':
      case 'tested':
      case 'played':
        navigate(`/m/${e.key}`);
        break;
      case 'handbook':
      case 'leadDiscuss':
      case 'missionDocs':
      case 'orientDocs':
        navigate(`/d/${e.key}`);
        break;
      default:
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
