interface ChatList{
    talker?:string
    alias?:string
    msgCount?:number
    conRemark?:string
    createTime?:number
    localAvatar?:string
    nickname?:string
    reserved1?:string
    reserved2?:string
    userType?:number
}
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
    isChatRoom:boolean;
    userInfo:UserInfo;
}

interface UserInfo {
	userName:    string;
	alias :        string;
	conRemark:     string;
	nickName  :    string ;
	reserved1 :    string ;
	reserved2  :   string ;
	localAvatar:   string ;
    
}

export type {ChatList,ChatMessageList,UserInfo};