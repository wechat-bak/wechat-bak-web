import { UserOutlined } from '@ant-design/icons';
import * as React from 'react';
import './WxListItem.css';
import { Avatar, Badge, Card } from 'antd';

const { Meta } = Card;

interface IWxListItemProps {
}

const WxListItem: React.FunctionComponent<IWxListItemProps> = (props) => {
    let list: any = [];

    for (let index = 0; index < 20; index++) {
        list.push(
            <Card style={{ width: 300 }} key={index}>
                <Meta
                    avatar={<Badge count={1}><Avatar size="large" icon={<UserOutlined />} src='https://avatars.githubusercontent.com/u/33391732?s=40&v=4' /></Badge>}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        )
    }
    return list
};

export default WxListItem;
