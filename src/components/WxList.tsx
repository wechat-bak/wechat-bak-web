import {FC,useEffect,useState} from 'react';
import { Layout, Input } from 'antd';
import { useLocation,Outlet } from 'react-router-dom';
import {ChatList} from './DataType'
import WxListItem from './WxListItem';
import axios from 'axios';

const { Sider, Content } = Layout;
const { Search } = Input;

interface IWxListProps {
}


const WxList: FC<IWxListProps> = (props) => {
    const [chatLists,setChatLists]=useState<ChatList[]>([])
    const [display,setDisplay] = useState("")
    let href = useLocation();

    useEffect(()=>{
        let url = "";
        console.log(href)
        setDisplay("")
        switch(href.pathname){
            case "/wx":
                url = 'http://127.0.0.1:3000/api/chat/list?all=true&pageIndex=1&pageSize=10';
                break;
            case "/txl":
                url = 'http://127.0.0.1:3000/api/chat/list?all=fasle&pageIndex=2&pageSize=10';
                break;
        }
        if(url===""){
            setDisplay("none")
        }else{
            axios.get(url)
            .then(res=>{
                setChatLists(res.data.rows)
                setDisplay("none")
            })
        }
    },[href])


    return <Layout className="site-layout">
        <Sider
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
            
            <WxListItem chatLists={chatLists} display={display} />
    </Sider>
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        // padding: 24,
        minHeight: 280,
      }}
    >
    <Outlet />
    </Content>
  </Layout>;
};

export default WxList;
