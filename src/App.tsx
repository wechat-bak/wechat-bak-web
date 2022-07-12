import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import "./App.css"
import { Outlet , useLocation,Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const breadcrumbNameMap: Record<string, string> = {
  '/wx': '微信',
  '/txl': '通讯录',
};



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          height: '100vh',
        }}
      >
        <div className="logo" ><WechatOutlined />  微信备份</div>
        <LeftMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;