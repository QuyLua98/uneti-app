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
        const {token} = state.auth;
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };

        axios
            .get(`${Config.CHAT_DOMAIN}/api/conversation/${conId}`, {headers})
            .then((res) => {
                conversation = res.data;
                console.log(res.data)
            });

        return dispatch({
            type: types.MESSAGE_INCOMING,
            incomingMessages: incomingMessages,
            conversations: [conversation]
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
