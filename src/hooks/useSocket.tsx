import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useEffect, useMemo, useState } from "react";
import { SOCKET_MESSAGE_TYPES } from "../common/constants";

import {
    historicalChatHandler,
    messageFromChattingFriendHandler,
    messageFromNotChattingFriendHandler,
    unsentMessageCountsWithLatestMessageHandler,
} from "../utility/message-handler";
import { pushSentMessage } from "../state/slices/chatSlice";

const useSocket = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const [isSocketOpen, setIsSocketOpen] = useState<boolean>(false);
    const [pendingMessages, setPendingMessages] = useState<
        Array<iSocketMessage>
    >([]);
    const messageHandlers = useMemo(
        () => ({
            [SOCKET_MESSAGE_TYPES.unsentMessageCountWithLatestMessage]:
                unsentMessageCountsWithLatestMessageHandler,
            [SOCKET_MESSAGE_TYPES.historicalChat]: historicalChatHandler,
            [SOCKET_MESSAGE_TYPES.messageFromChattingFriend]:
                messageFromChattingFriendHandler,
            [SOCKET_MESSAGE_TYPES.messageFromNotChattingFriend]:
                messageFromNotChattingFriendHandler,
        }),
        [],
    );

    const initiateSocketConnection = () => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
        setWs(ws);

        ws.onopen = () => {
            setIsSocketOpen(true);
        };

        ws.onmessage = (event: MessageEvent) => {
            try {
                const message: iSocketMessage = JSON.parse(event.data);
                const { type, data } = message;
                messageHandlers[type](data, dispatch);
            } catch (error) {
                toast.error("Something went wrong");
            }
        };

        ws.onclose = (ev: CloseEvent) => {
            setIsSocketOpen(false);
            const responseCode = ev.code;
            switch (responseCode) {
                case 1006:
                    toast.error("Something went wrong");
                    break;
            }
        };
    };

    const sendSocketMessage = (type: string, data: any) => {
        const message: iSocketMessage = {
            type,
            data,
        };
        if (ws.OPEN) {
            ws.send(JSON.stringify(message));
            dispatch(pushSentMessage(data));
        } else {
            setPendingMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    const sendUIStatus = (data: any) => {
        const message: iSocketMessage = {
            type: SOCKET_MESSAGE_TYPES.userUIStatus,
            data,
        };
        if (isSocketOpen) {
            ws.send(JSON.stringify(message));
        } else {
            setPendingMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    useEffect(() => {
        if (isSocketOpen) {
            pendingMessages.forEach((message: iSocketMessage) => {
                const { type, data } = message;
                sendSocketMessage(type, data);
            });
            setPendingMessages([]);
        }
    }, [isSocketOpen]);

    return { initiateSocketConnection, sendUIStatus, sendSocketMessage };
};

export default useSocket;
