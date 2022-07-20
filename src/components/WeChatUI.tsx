import { FC, useEffect, useState } from 'react';
import Chat, { Bubble, useMessages, SystemMessage,Video } from '@chatui/core';
import { Image } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ChatMessageList, UserInfo } from './DataType'

interface IWeChatUIProps {
  // talker: string;
}

const WeChatUI: FC<IWeChatUIProps> = (props) => {
  const { messages, appendMsg, prependMsgs, resetList } = useMessages();
  let href = useLocation();

  const [pageIndex, setPageIndex] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [username, setUserName] = useState("");

  let msgUrl = "/api/chat/detail?talker=" + username + "&pageIndex=" + pageIndex + "&pageSize=5";
  useEffect(() => {
    // 获取个人信息
    axios.get("/api/user/info?username=" + href.pathname.split("/").pop()).then((res) => {
      setUserInfo(res.data);
      resetList([]);
      setPageIndex(1);
      setUserName(href.pathname.split("/").pop() || "");
    })
  }, [href.pathname, resetList]);


  useEffect(() => {
    axios.get(msgUrl).then(res => {
      res.data.rows.forEach((row: ChatMessageList) => {
        let id = row.msgSvrId + Math.floor(Math.random() * 9999);

        prependMsgs([{
          _id: id,
          type: row.type + "",
          content: row,
          position: row.isSend === 1 ? "right" : "left",
          user: {
            avatar: row.userInfo.reserved2 !== "" ? row.userInfo.reserved2 : row.userInfo.localAvatar,
            name: row.userInfo.userName,
          },
          hasTime: true,
          createdAt: row.createTime,
        }]);
      });
    })
  }, [msgUrl, prependMsgs]);


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
    // const { type, c: ChatMessageList } = msg;
    // 根据消息类型来渲染
    switch (msg.type) {
      case "1":
        // 文本
        return <Bubble content={msg.content.content} />;
      case "3":
        // 图片
        return <Bubble type="image">
          <Image src={msg.content.mediaSourcePath || msg.content.mediaPath} alt="图片" />
        </Bubble>;
      case "34":
        // 语音
        return <Bubble content="语音消息">
        <Video src={ msg.content.mediaPath } />
      </Bubble>;
      case "43":
        // 视频
        return <Bubble type="video">
              <Video src={ msg.content.mediaPath } />
            </Bubble>;
      case "47":
        // 大表情
        return <Bubble type="image">
          <img src={msg.content.emojiInfo.cdnUrl} alt="图片" />
        </Bubble>;
      case "48":
        return <Bubble content={"[位置消息😂]"} />;
      case "49":
        // 卡片信息
        return <Bubble content={"[卡片信息]"} />;
      case "10000":
        // 系统消息
        return <div style={{ margin: "0 auto" }}><SystemMessage content={msg.content.content} /></div>;;
      case "268445456":
        // 撤回消息通知
        return <div style={{ margin: "0 auto" }}><SystemMessage content={msg.content.content} /></div>;
      case "436207665":
        // 微信红包
        return "text";
      case "419430449":
        // 微信转账
        return "text";
      case "1090519089":
        // 文件
        return "";
      case "318767153":
        // 公众号推送
        return "text";
      default:
        return null;
    }
  }

  const onRefresh = (): Promise<any> => {
    return new Promise((resolve) => {
      setPageIndex(pageIndex + 1)
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

      <Chat
        navbar={{ title: userInfo.conRemark !== "" ? userInfo.conRemark : userInfo.nickName, className: "wechat-navbar" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleSend}
        onRefresh={onRefresh}
        loadMoreText="加载更多"
      />
    </div>
  );
};

export default WeChatUI;
