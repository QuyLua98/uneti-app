import * as types from "./types";
import {Conversation} from "../../components/entity/Conversation";
import ChatRequest from "../../api/chat/ChatRequest";
import {JWT_TOKEN} from "../../constants/Constants";
import axios from "axios";
import {Config} from "../../config";

export const setUpChatBox = (conId, messages, userIdReceive, usernameReceive) => {
    return {
        type: types.SETUP_CHAT_BOX,
        conId: conId,
        messages: messages,
        userIdReceive: userIdReceive,
        usernameReceive: usernameReceive,
    };
};

export const initConversation = (conId, incomingMessages) => (dispatch, getState) => {
    const state = getState();
    const {token} = state.auth;
    const headers = {
        [JWT_TOKEN]: `Bearer ${token}`,
    };

    axios
        .get(`${Config.CHAT_DOMAIN}/api/conversation/${conId}`, {headers})
        .then((res) => {
            let conversation = res.data;
            conversation.messages = [...incomingMessages];
            return dispatch({
                type: types.MESSAGE_INCOMING,
                incomingMessages: incomingMessages,
                conversations: [conversation]
            })
        });
}

export const incomingMessage = (conversation, incomingMessages) => (dispatch, getState) => {
    const state = getState();
    const {conversations} = state.chat;
    conversation.messages = [...incomingMessages, ...conversation.messages];
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
