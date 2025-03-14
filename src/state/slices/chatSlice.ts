import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAT_MESSAGE_FOR_DISPLAY } from "../../types/socket";
import { resetState } from "../store";
import { formatDate } from "../../common/helper";

interface iChatSliceProps {
    chatsAddedAction: "append" | "preprend" | null;
    chats: any;
    unseenMessageCounts: Record<number, number>;
    latestMessages: Record<number, string>;
}

const initialState: iChatSliceProps = {
    chatsAddedAction: null,
    chats: {},
    unseenMessageCounts: {},
    latestMessages: {},
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setUnseenMessageCounts: (
            state: iChatSliceProps,
            action: PayloadAction<Record<number, number>>,
        ) => {
            state.unseenMessageCounts = action.payload;
        },
        setLatestMessages: (
            state: iChatSliceProps,
            action: PayloadAction<Record<number, string>>,
        ) => {
            state.latestMessages = action.payload;
        },
        pushHistoricChatData: (
            state: iChatSliceProps,
            action: PayloadAction<Record<string, any>>,
        ) => {
            const { friendId, chatData } = action.payload;
            if (!state.chats[friendId]) {
                state.chats[friendId] = {};
            }

            Object.entries(chatData).forEach(
                ([date, messages]: [
                    string,
                    Array<CHAT_MESSAGE_FOR_DISPLAY>,
                ]) => {
                    if (state.chats[friendId][date]) {
                        state.chats[friendId][date] = [
                            ...messages,
                            ...state.chats[friendId][date],
                        ];
                    } else {
                        state.chats[friendId][date] = [...messages];
                    }
                },
            );
            state.chatsAddedAction = "append";
        },
        pushSentMessage: (
            state: iChatSliceProps,
            action: PayloadAction<any>,
        ) => {
            const { toId, content } = action.payload;
            const currentDate = formatDate(new Date(), "dd mmm yyyy");
            const currentTime = new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            });

            if (!state.chats[toId]) {
                state.chats[toId] = {};
            }

            if (!state.chats[toId][currentDate]) {
                state.chats[toId][currentDate] = [];
            }

            state.chats[toId][currentDate].push({
                content,
                isUser: true,
                sentLocalTime: currentTime,
            });
            state.chatsAddedAction = "append";
        },
        pushReceivedMessage: (
            state: iChatSliceProps,
            action: PayloadAction<any>,
        ) => {
            const { fromId, content, sentDate } = action.payload;

            const formattedSentDate = formatDate(
                new Date(sentDate),
                "dd mmm yyyy",
            );
            const sentTime = new Date(sentDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            });

            if (!state.chats[fromId]) {
                state.chats[fromId] = {};
            }

            if (!state.chats[fromId][formattedSentDate]) {
                state.chats[fromId][formattedSentDate] = [];
            }

            state.chats[fromId][formattedSentDate].push({
                content,
                isUser: true,
                sentTime,
            });
            state.chatsAddedAction = "append";
        },
        setUnseenMesssageCountAndUpdateLatestMessage: (
            state: iChatSliceProps,
            action: PayloadAction<any>,
        ) => {
            const { friendId, content } = action.payload;
            state.unseenMessageCounts[friendId] += 1;
            state.latestMessages[friendId] = content;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => {
            return initialState;
        });
    },
});

export const {
    setLatestMessages,
    setUnseenMessageCounts,
    pushHistoricChatData,
    pushSentMessage,
    pushReceivedMessage,
    setUnseenMesssageCountAndUpdateLatestMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
