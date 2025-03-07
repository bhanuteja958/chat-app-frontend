import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import FriendsReducer from "./slices/friendsSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        friends: FriendsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
