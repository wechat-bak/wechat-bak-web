import {
  WechatOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import {FC,useEffect} from 'react';
import LeftMenu from './components/LeftMenu';
import { useNavigate } from 'react-router-dom';

import "./App.css"
import { Outlet } from 'react-router-dom';

const { Sider } = Layout;

const App: FC = () => {
  let navg = useNavigate()
  useEffect(() => {
    navg("wx")
  },[navg]);
  return (
    <Layout>
      <Sider
        style={{
          height: '100vh',
        }}
      >
        <div className="logo" ><WechatOutlined />  微信备份</div>
        <LeftMenu />
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default App;