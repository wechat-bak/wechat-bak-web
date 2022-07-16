import {FC} from 'react';
import {useLocation} from 'react-router-dom';

interface IChatProps {
    // talker: string;
}

const Chat: FC<IChatProps> = (props) => {
    let href = useLocation();
  return <div>{href.pathname}</div>;
};

export default Chat;
