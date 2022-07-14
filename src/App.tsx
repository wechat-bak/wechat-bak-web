import {
  WechatOutlined,
} from '@ant-design/icons';
import { Layout, Input } from 'antd';
import React, { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import WxListItem from './components/WxListItem';
import "./App.css"
import { Outlet } from 'react-router-dom';
import ChatList from './components/DataType'

const { Sider, Content } = Layout;
const { Search } = Input;



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading,setLoading]=useState(true)
  // var list:ChatList[]
  const [chatLists,setChatLists]=useState<ChatList[]>([])

  return (
    <Layout>
      <Sider
        style={{
          height: '100vh',
        }}
      >
        <div className="logo" ><WechatOutlined />  微信备份</div>
        <LeftMenu name='1fasd' age={123} setCollapsed={setCollapsed} setLoading={setLoading} setChatLists={setChatLists}/>
      </Sider>

      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsedWidth={0}
        width={300}
        style={{
          height: '100vh',
          backgroundColor: '#f0f2f5',
          color: '#FFF'
        }}
      >
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          style={{
            // padding: '5px',
          }}
        />
        <div id="wxlist">
          <WxListItem loading={loading} chatLists={chatLists}/>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;