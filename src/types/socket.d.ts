export interface UNSEEN_MESSAGE_COUNT_WITH_LATEST_MESSAGE_DATA {
    count: number;
    latestMessage: string;
}

export interface CHAT_MESSAGE {
    messageId: number;
    fromId: number;
    toId: number;
    sentDate: string;
    content: string;
}

export interface CHAT_MESSAGE_FOR_DISPLAY {
    isUser: boolean;
    content: string;
    sentTime: string;
    messageId: number;
}

export interface HISTORICAL_CHAT_DATA {
    friendId: number;
    firstLoad: boolean;
    chat: Array<CHAT_MESSAGE>;
}

export interface MESSAGE_FROM_CHATTING_FRIEND_DATA {
    fromId: number;
    toId: number;
    content: number;
    sentDate: string;
}

export interface MESSAGE_FROM_NOT_CHATTING_FRIEND_DATA {
    fromId: number;
    toId: number;
    content: number;
    sentDate: string;
}
