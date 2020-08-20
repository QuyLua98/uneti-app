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

export const incomingMessage = (conId, incomingMessages) => (dispatch, getState) => {
    const {conversations} = getState();
    let conversation = conversations.find(c => c.conId === conId);
    if (conversation != null) {
        conversation.messages = [...incomingMessages, ...conversation.messages];
    }else {
        //TODO lỗi conversation undefined
    }
    return dispatch({
        type: types.MESSAGE_INCOMING,
        incomingMessages: incomingMessages,
        conversations: conversations
    })
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
