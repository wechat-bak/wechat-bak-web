import {
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import {  FC } from 'react';
import { useLocation ,Link} from 'react-router-dom';

interface ILeftMenuProps {
  // name?: string;
  // age?: number;
  // setCollapsed: (collapsed: boolean) => void;
  // setLoading: (loading: boolean) => void;
  // setChatLists: (chatList:ChatList[]) => void;
}

const LeftMenu: FC<ILeftMenuProps> = (props) => {
  let href = useLocation();

  const getDefaultSelectedKeys = ():string[] => {
      if (href.pathname==='/wx') {
        return ["2"]
      }else if (href.pathname==='/txl') {
        return ["3"]
      }else if (href.pathname==='/ybp') {
        return ["1"]
      }
      return []
  }

  return <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={getDefaultSelectedKeys()}
    onSelect={(e)=>{
      
      // getChatListData();
    }}
    items={[
      // {
      //   key: '1',
      //   icon: <UserOutlined />,
      //   label: <Link to="ybp">仪表盘</Link>,
      // },
      {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="wx">聊天</Link>,
      },
      // {
      //   key: '3',
      //   icon: <VideoCameraOutlined />,
      //   label: <Link to="txl">通讯录</Link>,
      // },
    ]}
  />
}

export default LeftMenu;