import { FC,useEffect, useState } from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {ChatMessageList} from './DataType'

interface IWeChatUIProps {
  // talker: string;
}

const getType = (type: number): string => {
  switch (type) {
    case 1:
      // 文本
      return "text";
    case 3:
      // 图片
      return "image";
    case 34:
      // 语音
      return "voice";
    case 43:
      // 视频
      return "video";
    case 47:
      // 大表情
      return "image";
    case 1000:
      // 撤回消息
      return "text";
    case 436207665:
      // 微信红包
      return "text";
    case 419430449:
      // 微信转账
      return "text";
    case 1090519089:
      // 文件
      return "";

  }
  return "";
}


const WeChatUI: FC<IWeChatUIProps> = (props) => {
  const { messages, appendMsg,prependMsgs,resetList } = useMessages();
  let href = useLocation();
  const [pageIndex,setPageIndex] = useState(1);
  let url = "/api/chat/detail?talker="+href.pathname.split("/").pop()+"&pageIndex="+pageIndex+"&pageSize=5";
  console.log(url)
  useEffect(() => {
    resetList([]);
    setPageIndex(1);
  }, [href.pathname,resetList]);
  useEffect(() => {
    axios.get(url).then(res => {
      res.data.rows.forEach((row: ChatMessageList) => {
        prependMsgs([{
          _id:Math.floor(Math.random() * 9999999),
          type: getType(row.type),
          content: {text:row.content},
          position: row.isSend===1?"right":"left"
        }])
      });
    })
  }, [url,prependMsgs]);
  


  const handleSend = (type: string, val: string) => {
    if (type === "text" && val.length > 0) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }

  const handleQuickReplyClick = (item: any) => {
    handleSend('text', item.name);
  }

  const renderMessageContent = (msg: any) => {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  const onRefresh = (): Promise<any> => {
    return new Promise((resolve) => {
      setPageIndex(pageIndex+1)
    })
  }

  return (
    <div id="wechat-ui"
      style={{
        height: '830px',
        width: '410px',
        padding: '55px 19px 53px 22px',
        backgroundSize: '410px 830px',
        background: 'url(https://img.alicdn.com/tfs/TB17Ne9u8r0gK0jSZFnXXbRRXXa-820-1660.png) center center / cover no-repeat',

      }}>
        {/* <Loading tip="加载中..." /> */}
        
      <Chat
        navbar={{ title: '智能助理'}}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleSend}
        onRefresh={onRefresh}
        loadMoreText="more"
      />
    </div>
  );
};

export default WeChatUI;
