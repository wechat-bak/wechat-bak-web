import {FC} from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';

interface IWeChatUIProps {
    // talker: string;
}

const initialMessages = [
  {
    type: 'text',
    content: { text: '主人好，我是智能助理，你的贴心小助手~' },
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
  {
    type: 'image',
    content: {
      picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png',
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '联系人工服务',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '短语1',
    isNew: true,
  },
  {
    name: '短语2',
    isHighlight: true,
  },
  {
    name: '短语3',
  },
];




const WeChatUI: FC<IWeChatUIProps> = (props) => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  const handleSend= (type:string, val:string) =>{
    if (type === "text" && val.length > 0) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }

  const handleQuickReplyClick = (item:any)=> {
    handleSend('text', item.name);
  }

  const renderMessageContent= (msg:any) =>{
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
  return (
    <div id="wechat-ui" 
    style={{
      height: '830px',
      width: '410px',
      padding: '55px 19px 53px 22px',
      backgroundSize: '410px 830px',
      background: 'url(https://img.alicdn.com/tfs/TB17Ne9u8r0gK0jSZFnXXbRRXXa-820-1660.png) center center / cover no-repeat'
    }}>
      <Chat
      navbar={{ title: '智能助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
    </div>
  );
};

export default WeChatUI;
