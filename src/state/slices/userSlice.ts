import {
    Action,
    createAsyncThunk,
    createSlice,
    PayloadAction,
    Slice,
} from "@reduxjs/toolkit";
import {
    LOGIN_API,
    LOGOUT_API,
    REGISTER_API,
    USER_INFO_API,
} from "../../common/APIs";
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
                    return [
                        "user/login/pending",
                        "user/logout/pending",
                        "user/info/pending",
                        "user/register/pending",
                    ].includes(action.type);
                },
                (state: iUserSliceState) => {
                    state.authLoading = true;
                },
            )
            .addMatcher(
                (action: Action) => {
                    return [
                        "user/login/fulfilled",
                        "user/logout/fulfilled",
                        "user/info/fulfilled",
                        "user/register/fulfilled",
                    ].includes(action.type);
                },
                (state: iUserSliceState, action: PayloadAction<any>) => {
                    const response = action.payload;
                    const { success, message, data } = response;
                    let showToast = true;

                    switch (action.type) {
                        case "user/login/fulfilled":
                            state.isLoggedIn = success;
                            break;
                        case "user/logout/fulfilled":
                            state.isLoggedIn = !success;
                            break;
                        case "user/info/fulfilled":
                            state.isLoggedIn = success;
                            showToast = false;
                            if (success) {
                                state.userDetails = data;
                            }
                            break;
                    }
                    showToast && toast[success ? "success" : "error"](message);
                    state.authLoading = false;
                },
            )
            .addMatcher(
                (action: Action) => {
                    return [
                        "user/login/rejected",
                        "user/logout/rejected",
                        "user/info/rejected",
                        "user/register/rejected",
                    ].includes(action.type);
                },
                (state: iUserSliceState, action: PayloadAction<string>) => {
                    switch (action.type) {
                        case "user/login/fulfilled":
                        case "user/info/fulfilled":
                            state.isLoggedIn = false;
                            state.userDetails = {};
                            break;
                    }
                    toast.error(action.payload);
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

export const userInfo = createAsyncThunk("user/info", async () => {
    try {
        const fetchResult = await fetch(`${API_URL}/${USER_INFO_API}`, {
            method: "GET",
            credentials: "include",
        });
        const response = await fetchResult.json();
        return response;
    } catch (error) {
        return error.message;
    }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
    try {
        const fetchResult = await fetch(`${API_URL}/${LOGOUT_API}`, {
            method: "GET",
            credentials: "include",
        });
        const response = await fetchResult.json();
        console.log(response);
        return response;
    } catch (error) {
        return error.message;
    }
});

export default userSlice.reducer;
