import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState ,useEffect, FC } from 'react';
import { useNavigate,useLocation ,Link} from 'react-router-dom';




const LeftMenu: FC = () => {
  let href = useLocation();
  const getDefaultSelectedKeys = ():string[] => {
      if (href.pathname=='/wx') {
        return ["1"]
      }else if (href.pathname=='/txl') {
        return ["2"]
      }
      return []
  }
  return <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={getDefaultSelectedKeys()}
    items={[
      {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to="wx">微信</Link>,
      },
      {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: <Link to="txl">通讯录</Link>,
      },
      {
        key: '3',
        icon: <UploadOutlined />,
        label: '个人信息',
      },
    ]}
  />
}

export default LeftMenu;