import * as types from "./types";

export const setUpChatBox = (conId, messages, userIdReceive, usernameReceive) => {
    return {
        type: types.SETUP_CHAT_BOX,
        conId: conId,
        messages: messages,
        userIdReceive: userIdReceive,
        usernameReceive: usernameReceive,
    };
};

export const incomingMessage = receiveMessage => {
    return {
        type: types.MESSAGE_RECEIVING,
        messageReceive: receiveMessage
    };
};

export const sendMessage = (data, api) => {
    return {
        type: types.MESSAGE_SEND,
        payload: {
            data,
            api,
        }
    };
};

export const subscribe = subscribe => {
    return {
        type: types.MESSAGE_SUBSCRIBE,
        payload: {
            subscribe
        }
    };
};
