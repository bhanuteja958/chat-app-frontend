import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAT_MESSAGE_FOR_DISPLAY } from "../../types/socket";
import { resetState } from "../store";

interface iChatSliceProps {
    chats: any;
    unseenMessageCounts: Record<number, number>;
    latestMessages: Record<number, string>;
}

const initialState: iChatSliceProps = {
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
} = chatSlice.actions;

export default chatSlice.reducer;
