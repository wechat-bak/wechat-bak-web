import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { FC } from 'react';

const LeftMenu: FC = () => {
  return <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['1']}
    items={[
      {
        key: '1',
        icon: <UserOutlined />,
        label: '微信',
      },
      {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: '通讯录',
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