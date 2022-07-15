import { UserOutlined } from '@ant-design/icons';
import {FC,useRef} from 'react';
import './WxListItem.css';
import { Avatar, Badge, Card } from 'antd';
import ChatList from './DataType'
import { useVirtualList } from 'ahooks';


const { Meta } = Card;

interface IWxListItemProps {
    chatLists:ChatList[];
}


const WxListItem: FC<IWxListItemProps> = (props) => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const [virtualList] = useVirtualList(props.chatLists, {
        containerTarget: containerRef,
        wrapperTarget: wrapperRef,
        itemHeight: 60,
        overscan: 10,
      });

    // let list: any = [];
    // console.log(virtualList);
    // virtualList.forEach(item => {
    //     list.push(
    //         <Card style={{ width: 300 }} key={item.data.talker} hoverable={true}>
    //             <Meta
    //                 avatar={<Badge count={item.data.msgCount}><Avatar size="large" icon={<UserOutlined />} src={item.data.reserved1} /></Badge>}
    //                 title={item.data.nickname}
    //                 description={item.data.talker}
    //             />
    //         </Card>
    //     )
    // });
    // return list;


    return (
        <>
          <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
            <div ref={wrapperRef}>
                {virtualList.map((item)=>(
                    <Card style={{ width: 300 }} key={item.data.talker} hoverable={true}>
                        <Meta
                            avatar={<Badge count={item.data.msgCount}><Avatar size="large" icon={<UserOutlined />} src={item.data.reserved1} /></Badge>}
                            title={item.data.nickname}
                            description={item.data.talker}
                        />
                    </Card>
                ))}
            </div>
          </div>
        </>
      );
};

export default WxListItem;
