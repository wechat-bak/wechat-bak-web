import { UserOutlined } from '@ant-design/icons';
import { FC,MouseEventHandler } from 'react';
import './WxListItem.css';
import { Avatar, Badge, Card } from 'antd';
import ChatList from './DataType'
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;

interface IWxListItemProps {
  display: string;
  chatLists: ChatList[];
}


const WxListItem: FC<IWxListItemProps> = (props) => {
  let navg = useNavigate()
  const navigateFunc:MouseEventHandler<HTMLDivElement> =(event)=>{
    navg(event.currentTarget.id)
  }
  return (
    <div id="wxlist" >
      <Card style={{
        width: 300,
        marginTop: 16,
        display: props.display
      }} loading={true}>
        <Meta
          avatar=""
          title="Card title"
          description="This is the description"
        />
      </Card>
      {props.chatLists.map((item) => (
        <Card style={{ width: 300 }} id={item.talker} key={item.talker} hoverable={true} onClick={navigateFunc}>
          <Meta
            avatar={<Badge count={item.msgCount}><Avatar size="large" icon={<UserOutlined />} src={item.reserved1} /></Badge>}
            title={item.nickname}
            description={item.talker}
          />
        </Card>
      ))}
    </div>
  );
};

export default WxListItem;
