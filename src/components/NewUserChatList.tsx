import { Avatar, Divider, List, Skeleton, Badge, Popover, Tag,Spin,Image} from 'antd';
import { useEffect, useState, FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChatList } from './DataType'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface INewUserChatListProps {
    searchName?: string;
}



const NewUserChatList: FC<INewUserChatListProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ChatList[]>([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const navg = useNavigate();

    const getTag = (user: ChatList) => {
        switch (user.userType) {
            case 1:
                return <Tag color="#2db7f5">群聊</Tag>
            case 2:
                return <Tag color="#87d068">公众号</Tag>
        }
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setPageIndex(pageIndex + 1);
        console.log(pageIndex);
        setLoading(true);
        axios.get('/api/chat/list?all=false&pageIndex=' + pageIndex + '&pageSize=20&name=' + props.searchName)
            .then(body => {
                setData([...data, ...body.data.rows]);
                setTotal(body.data.total);
                console.log(body)
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        setPageIndex(1);
        axios.get('/api/chat/list?all=false&pageIndex=1&pageSize=20&name=' + props.searchName)
            .then(body => {
                setData(body.data.rows);
                setTotal(body.data.total);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [props.searchName]);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: '75vh',
                overflow: 'auto',
                padding: '0 46px',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < total}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>没有更多数据了</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (

                        <List.Item
                            style={{
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(element) => {
                                element.currentTarget.style.backgroundColor = 'rgba(140, 140, 140, 0.35)';
                            }}
                            onMouseLeave={(element) => {
                                element.currentTarget.style.backgroundColor = '#FFF';
                            }}
                            onClick={() => {
                                navg(item.talker || "");
                            }}

                            key={item.talker + "_" + Math.random()}>
                            <List.Item.Meta
                                avatar={
                                    <Popover placement="rightTop"
                                        content={<div>
                                            <p>昵称: {item.nickname}</p>
                                            <p>备注: {item.conRemark}</p>
                                            <p>微信号: {item.alias}</p>
                                            <p>微信ID: {item.talker}</p>
                                        </div>}
                                        title="用户信息">
                                            <Badge count={item.msgCount}><Avatar src={<Image src={item.localAvatar} fallback={item.reserved2} alt="头像"/>} /></Badge>
                                    </Popover>
                                }
                                title={<div>{item.conRemark || item.nickname} {getTag(item)}</div>}
                                description={item.talker}
                            />
                            <Spin spinning={false} />
                        </List.Item>

                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

export default NewUserChatList;
