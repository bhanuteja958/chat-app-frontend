import {
    Action,
    createAsyncThunk,
    createSlice,
    PayloadAction,
    Slice,
} from "@reduxjs/toolkit";
import { LOGIN_API, REGISTER_API } from "../../common/APIs";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface iUserSliceState {
    isLoggedIn: boolean;
    authLoading: boolean;
    userDetails: any;
}

const initialState: iUserSliceState = {
    isLoggedIn: false,
    authLoading: false,
    userDetails: {},
};

const userSlice: Slice<iUserSliceState> = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action: Action) => {
                    return (
                        action.type.includes("/pending") &&
                        (action.type.includes("user/login") ||
                            action.type.includes("user/register"))
                    );
                },
                (state: iUserSliceState) => {
                    state.authLoading = true;
                },
            )
            .addMatcher(
                (action: Action) => {
                    return (
                        action.type.includes("/fulfilled") &&
                        (action.type.includes("user/login") ||
                            action.type.includes("user/register"))
                    );
                },
                (state: iUserSliceState, action: PayloadAction<any>) => {
                    const response = action.payload;
                    if (response.success) {
                        toast.success(response.message);
                        if (action.type.includes("user/login")) {
                            state.isLoggedIn = true;
                        }
                    } else {
                        if (action.type.includes("user/login")) {
                            state.isLoggedIn = false;
                        }
                        toast.error(response.message);
                    }
                    state.authLoading = false;
                },
            )
            .addMatcher(
                (action: Action) => {
                    return (
                        action.type.includes("/rejected") &&
                        (action.type.includes("user/login") ||
                            action.type.includes("user/register"))
                    );
                },
                (state: iUserSliceState, action: PayloadAction<string>) => {
                    toast.error(action.payload);
                    if (action.type.includes("user/login")) {
                        state.isLoggedIn = false;
                    }
                    state.authLoading = false;
                },
            );
    },
});

export const login = createAsyncThunk(
    "user/login",
    async (loginPayload: iLoginPayload) => {
        try {
            const fetchResult = await fetch(`${API_URL}/${LOGIN_API}`, {
                method: "POST",
                body: JSON.stringify(loginPayload),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await fetchResult.json();
            return response;
        } catch (error) {
            return error.message;
        }
    },
);

export const register = createAsyncThunk(
    "user/register",
    async (registerPayload: iRegisterPayload) => {
        try {
            const fetchResult = await fetch(`${API_URL}/${REGISTER_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerPayload),
            });
            const response = await fetchResult.json();
            return response;
        } catch (error) {
            return error.message;
        }
    },
);

export default userSlice.reducer;
