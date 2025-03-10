import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FRIENDS_LIST_API } from "../../common/APIs";
import toast from "react-hot-toast";
import { resetState } from "../store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface iFriendsSliceState {
    friendsLoading: boolean;
    friendsList: Array<iFriendDetails>;
}

const initialState: iFriendsSliceState = {
    friendsList: [],
    friendsLoading: false,
};

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resetState, (state: iFriendsSliceState) => {
                return initialState;
            })
            .addCase(getAllFriends.pending, (state: iFriendsSliceState) => {
                state.friendsLoading = true;
            })
            .addCase(
                getAllFriends.fulfilled,
                (state: iFriendsSliceState, action: PayloadAction<any>) => {
                    const response = action.payload;
                    const { success, message, data } = response;
                    if (success) {
                        state.friendsList = data;
                    } else {
                        state.friendsList = [];
                    }
                    toast[success ? "success" : "error"](message);
                    state.friendsLoading = false;
                },
            )
            .addCase(getAllFriends.rejected, (state: iFriendsSliceState) => {
                state.friendsLoading = false;
                toast.error("Something went wrong");
            });
    },
});

export const getAllFriends = createAsyncThunk("friends/list", async () => {
    try {
        const fetchResult = await fetch(`${API_URL}/${FRIENDS_LIST_API}`, {
            method: "GET",
            credentials: "include",
        });
        const response = await fetchResult.json();
        return response;
    } catch (error) {
        throw error;
    }
});

export default friendsSlice.reducer;
