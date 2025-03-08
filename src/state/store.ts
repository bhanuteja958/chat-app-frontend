import { configureStore, createAction } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import FriendsReducer from "./slices/friendsSlice";
import ChatsReducer from "./slices/chatSlice";
export const resetState = createAction("RESET_STATE");

export const store = configureStore({
    reducer: {
        user: UserReducer,
        friends: FriendsReducer,
        chats: ChatsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
