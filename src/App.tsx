import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import "./App.css"

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;