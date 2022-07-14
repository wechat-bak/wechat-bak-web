import { UserOutlined } from '@ant-design/icons';
import {FC} from 'react';
import './WxListItem.css';
import { Avatar, Badge, Card } from 'antd';
import ChatList from './DataType'


const { Meta } = Card;

interface IWxListItemProps {
    loading?:boolean;
    chatLists:ChatList[];
}


const WxListItem: FC<IWxListItemProps> = (props) => {
    let list: any = [];
    props.chatLists.forEach(item => {
        list.push(
            <Card style={{ width: 300 }} key={item.talker} loading={props.loading}>
                <Meta
                    avatar={<Badge count={item.msgCount}><Avatar size="large" icon={<UserOutlined />} src={item.reserved1} /></Badge>}
                    title={item.nickname}
                    description={item.talker}
                />
            </Card>
        )
    });
    return list
};

export default WxListItem;
