import { FC, useState } from 'react';
import { Layout, Input } from 'antd';
import NewUserChatList from './NewUserChatList';
import Chat from './WeChatUI';

const { Sider, Content } = Layout;
const { Search } = Input;

interface IWxListProps {
}



const WxList: FC<IWxListProps> = (props) => {

    const [searchName, setSearchName] = useState("");

    const onSearch = (value: string) => setSearchName(value);


    return <Layout className="site-layout">

        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            <div style={{
                textAlign: 'center',
            }}>
                <h1 style={{
                    fontSize: '40px',
                }}>聊天记录搜索</h1>
                <Search placeholder="请输入要搜索的微信用户名" onSearch={onSearch} enterButton style={{ width: 500,marginBottom:30}} />
            </div>

            <NewUserChatList searchName={searchName} />
        </Content>
        <Sider
            width={410}
            style={{
                height: '100vh',
                backgroundColor: '#FFF',
                color: '#FFF'
            }}
        >
            {/* <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            style={{
                // padding: '5px',
            }}
        />
            
            <WxListItem chatLists={chatLists} display={display} /> */}
            <Chat />
        </Sider>
        {/* <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        // padding: 24,
        minHeight: 280,
      }}
    >
    <Outlet />
    </Content> */}
    </Layout>;
};

export default WxList;
