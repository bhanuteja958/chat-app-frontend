export interface UNSEEN_MESSAGE_COUNT_WITH_LATEST_MESSAGE_DATA {
    count: number;
    latestMessage: string;
}

export interface CHAT_MESSAGE {
    fromId: number;
    toId: number;
    sentDate: string;
    content: string;
}

export interface CHAT_MESSAGE_FOR_DISPLAY {
    isUser: boolean;
    content: string;
    sentTime: string;
}

export interface HISTORICAL_CHAT_DATA {
    friendId: number;
    chat: Array<CHAT_MESSAGE>;
}

export interface MESSAGE_FROM_CHATTING_FRIEND_DATA {
    fromId: number;
    toId: number;
    content: number;
    sentDate: string;
}
