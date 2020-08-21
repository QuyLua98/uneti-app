import * as types from "./types";
import {Conversation} from "../../components/entity/Conversation";
import ChatRequest from "../../api/chat/ChatRequest";

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
    const state = getState();
    const {conversations} = state.chat;
    let conversation = conversations.find(c => c.conId === conId);
    if (conversation != null) {
        conversation.messages = [...incomingMessages, ...conversation.messages];
        return dispatch({
            type: types.MESSAGE_INCOMING,
            incomingMessages: incomingMessages,
            conversations: conversations
        })
    }else {
        console.log(ChatRequest)
        const conversation = ChatRequest.get(`/conversation/${conId}`);
        console.log(conversation)

        return dispatch({
            type: types.MESSAGE_INCOMING,
            incomingMessages: incomingMessages,
            conversations: [...conversation]
        })
    }
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
