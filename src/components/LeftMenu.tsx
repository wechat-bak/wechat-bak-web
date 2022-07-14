import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import {  FC } from 'react';
import { useLocation ,Link} from 'react-router-dom';
import axios from 'axios';
import ChatList from './DataType'

interface ILeftMenuProps {
  name?: string;
  age?: number;
  setCollapsed: (collapsed: boolean) => void;
  setLoading: (loading: boolean) => void;
  setChatLists: (chatList:ChatList[]) => void;
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

  const  getChatListData = ()=>{
    props.setLoading(true)
    axios.get('http://127.0.0.1:3000/api/chat/list?all=true&pageIndex=0&pageSize=0')
    .then(res=>{
      props.setChatLists(res.data.rows)
      props.setLoading(false)
    })
  }

  return <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={getDefaultSelectedKeys()}
    onSelect={(e)=>{
      if(e.key!=="1"){
        props.setCollapsed(false)
      }else{
        props.setCollapsed(true)
      }
      getChatListData();
    }}
    items={[
      {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to="ybp">仪表盘</Link>,
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="wx">微信</Link>,
      },
      {
        key: '3',
        icon: <VideoCameraOutlined />,
        label: <Link to="txl">通讯录</Link>,
      },
    ]}
  />
}

export default LeftMenu;