
interface EmojiInfo {
    md5: string;
    cdnUrl: string;
    w: number;
    h: number;
}

interface FileInfo {
    fileName: string;
    fileSize: string;
    filePath: string;
    fileExt: string;
}

interface ChatMessageList {
    content: string;
    createTime: number;
    emojiInfo: EmojiInfo;
    fileInfo: FileInfo;
    imgPath: string;
    isSend: number;
    mediaBCKPath: string;
    mediaPath: string;
    mediaSourcePath: string;
    msgId: string;
    msgSvrId: string;
    talker: string;
    type: number;
}

export default ChatMessageList;