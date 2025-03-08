export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const enum SOCKET_MESSAGE_TYPES {
    unsentMessageCountWithLatestMessage = "UNSENT_MESSAGE_COUNT_WITH_LATEST_MESSAGE",
    messageFromNotChattingFriend = "MESSAGE_FROM_NOT_CHATTING_FRIEND",
    messageFromChattingFriend = "MESSAGE_FROM_CHATTING_FRIEND",
    messageToFriend = "MESSAGE_TO_FRIEND",
    historicalChat = "HISTORICAL_CHAT",
    userUIStatus = "USER_UI_STATUS",
    error = "ERROR",
    loadHistoricalChat = "LOAD_HISTORICAL_CHAT",
}

export const enum UI_STATUS {
    viewingFriendsList = "VIEWING_FRIENDS_LIST",
    openedFriendChat = "OPENED_FRIEND_CHAT",
}
