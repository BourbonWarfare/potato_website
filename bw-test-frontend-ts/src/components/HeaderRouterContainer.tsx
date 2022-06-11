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
  // TeamOutlined,
  UserOutlined,
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
// const items = [
//   getItem('Home', 'home', <FileOutlined />),
//   getItem('Category 1', 'category1', <PieChartOutlined />),
//   getItem('Category 2', 'category2', <DesktopOutlined />),
//   getItem('Funny', 'funny', <DesktopOutlined />),
//   getItem('Missions', 'missions', <UserOutlined />, [
//     getItem('Untested', 'untested'),
//     getItem('Tested', 'tested'),
//     getItem('Played', 'played'),
//     getItem('member', 'member', <DesktopOutlined />, [
//       getItem('memberHOme', 'memberhome'),
//     ]),
//   ]),
// ];

const items = [
  getItem('News & Announcements', 'news', <FileOutlined />, [
    getItem('New', 'new'),
    getItem('Community Events', 'events'),
  ]),
  getItem('Arma', 'arma', <PieChartOutlined />, [
    getItem('Getting Started', 'gettingStarted'),
    getItem('ArmA General', 'armaGeneral', <PieChartOutlined />, [
      getItem('Intel', 'intel'),
    ]),
    getItem('Mission Making', 'missionMaking', <PieChartOutlined />, [
      getItem('Finished Missions', 'finishedMissions'),
      getItem('Mission Archives', 'archivedMissions'),
      getItem('Repeat Mission Archives', 'repeatMissions'),
    ]),
    getItem('After Action Reports', 'aar'),
    getItem("Member's Only Lounge", 'membersLounge', <PieChartOutlined />, [
      getItem('Leadership and Pilot Program', 'leaderPilot'),
      getItem('Recruit Review', 'recruitReview'),
      getItem('Mod Discussion', 'modDiscuss', <PieChartOutlined />, [
        getItem('Accepted Mods', 'acceptedMods'),
        getItem('Rejected Mods', 'rejectedMods'),
      ]),
      getItem('Member Spotlight', 'memberSpot'),
    ]),
  ]),
  getItem('Staff Forum', 'staffForum', <DesktopOutlined />, [
    getItem('Staff Archive', 'staffArchive', <PieChartOutlined />, [
      getItem('Case File Archive', 'caseFile'),
      getItem('Denied Recruit Applications', 'denied'),
      getItem('Accepted Recruit Applications', 'accepted'),
      getItem('Leadership & LOA Archive', 'leadAndLOA', <PieChartOutlined />, [
        getItem('Upcoming Abscenses / MIAs Archive', 'abscenseAndMIA'),
      ]),
      getItem('General Archive', 'generalArchive', <PieChartOutlined />, [
        getItem('Other Games Archive', 'otherGames', <PieChartOutlined />, [
          getItem('RPG Night', 'rpgNight'),
          getItem('Naval Action', 'navalAction'),
          getItem('Pathfinder', 'pathfinder'),
        ]),
      ]),
      getItem('Documentation Rewrite', 'docRewrite'),
    ]),
    getItem('Administration Forum', 'adminForum'),
  ]),
  getItem('General', 'general', <DesktopOutlined />, [
    getItem('Other Games', 'otherGames'),
    getItem('Off Topic', 'offTopic'),
    getItem('Videos and Screenshots', 'vidAndScreen'),
    getItem("Upcoming Abscenses/MIA's", 'upcomingAbsAndMIA'),
  ]),
  getItem('Archives', 'archives', <UserOutlined />, [
    getItem('BW Archive', 'bwArchive', <PieChartOutlined />, [
      getItem('REDFOR Archive', 'redArchive', <PieChartOutlined />, [
        getItem('REDFOR Archive', 'redArchive2'),
      ]),
    ]),
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
      default:
        navigate(`/c/${e.key}`);
        break;
    }
  };

  const onCollapse = (collapse: any) => {
    console.log(collapse);
    setCollapsed(collapse);
  };

  // const handleRightClick = (e: any) => {
  //   setCurrent(e.key);
  //   navigate(`/${e.key}`);
  // };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {/* <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}> */}
      <Sider
        // style={{
        //   overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        // }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
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

// <Header style={{ background: '#ffffff' }}>
// <div className="logo" />
// {/* <div className="logo"> Test Title</div> */}
// <Menu
//   onClick={handleLeftClick}
//   selectedKeys={[current]}
//   mode="horizontal"
//   // style={{ float: 'left' }}
//   // theme="dark"
// >
//   <Menu.Item key="new">New Work Order</Menu.Item>
//   <Menu.Item key="custom">Custom Work Order</Menu.Item>
//   <Menu.Item key="customers">Customers</Menu.Item>
//   <Menu.Item key="parts">Parts</Menu.Item>
//   <Menu.Item key="labour">Labour</Menu.Item>
//   <Menu.Item key="employees">Employees</Menu.Item>
//   <Menu.Item key="units">Units</Menu.Item>
//   <Menu.Item key="expenses">Expenses</Menu.Item>
//   <Menu.Item key="profile">Profile</Menu.Item>
// </Menu>
// {/* <Menu // Use this for profile on the right of menu, though right menu is collapsed by default
//   onClick={handleRightClick}
//   selectedKeys={[current]}
//   mode="horizontal"
//   style={{ float: 'right' }}
// >
//   <Menu.Item key="profile">Profile</Menu.Item>
// </Menu> */}
// </Header>
