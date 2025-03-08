import { formatDate } from "../common/helper";
import {
    pushHistoricChatData,
    setLatestMessages,
    setUnseenMessageCounts,
} from "../state/slices/chatSlice";
import { AppDispatch } from "../state/store";
import {
    CHAT_MESSAGE,
    HISTORICAL_CHAT_DATA,
    UNSEEN_MESSAGE_COUNT_WITH_LATEST_MESSAGE_DATA,
} from "../types/socket";

export const unsentMessageCountsWithLatestMessageHandler = (
    data: Record<number, UNSEEN_MESSAGE_COUNT_WITH_LATEST_MESSAGE_DATA>,
    dispatch: AppDispatch,
) => {
    const unseenMessageCounts = {};
    const latestMessages = {};
    Object.entries(data).forEach(([friendId, values]) => {
        const { count, latestMessage } = values;
        unseenMessageCounts[friendId] = count;
        latestMessages[friendId] = latestMessage;
    });
    dispatch(setLatestMessages(latestMessages));
    dispatch(setUnseenMessageCounts(latestMessages));
};

export const historicalChatHandler = (
    data: HISTORICAL_CHAT_DATA,
    dispatch: AppDispatch,
) => {
    const { friendId, chat } = data;
    const newChatData = {};
    chat.sort((a: CHAT_MESSAGE, b: CHAT_MESSAGE) => {
        return new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime();
    }).forEach((message: CHAT_MESSAGE) => {
        const { content, fromId, sentDate } = message;
        const date = formatDate(new Date(sentDate), "dd mmm yyyy");
        const time = new Date(sentDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
        let messageForDisplay = {
            content: content,
            isUser: fromId !== friendId,
            sentTime: time,
        };
        if (!newChatData[date]) {
            newChatData[date] = [];
        }
        newChatData[date].push(messageForDisplay);
    });

    dispatch(
        pushHistoricChatData({
            friendId,
            chatData: newChatData,
        }),
    );
};
