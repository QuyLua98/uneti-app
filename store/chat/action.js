import * as types from "./types";
import {Alert} from "react-native";
import {JWT_TOKEN} from "../../constants/Constants";
import axios from "axios";
import {Config} from "../../config";
import {entityToMessage} from "../../components/module/chatting/Adapter";

const parseAllMessageEntityToMessage = (conversations) => {
    if(conversations != null) {
        conversations.forEach(c => {
            c.messages = c.messages.map(m => entityToMessage(m));
        });
        return conversations;
    }
    return null;
}

export const setUpChatBox = (conId, messages, userIdReceive, usernameReceive) => {
    console.log("Setting chat box.....")
    return {
        type: types.SETUP_CHAT_BOX,
        conId: conId,
        messages: messages,
        userIdReceive: userIdReceive,
        usernameReceive: usernameReceive,
    };
};

export const setUpConversations = () => async (dispatch, getState) => {
    console.log("Setting conversations.....")
    const state = getState();
    const {token} = state.auth;
    const headers = {
        [JWT_TOKEN]: `Bearer ${token}`,
    };
    axios
        .get(Config.CHAT_DOMAIN + `/api/user/conversation`, {headers})
        .then((res) => {
            let conversations = res.data;
            conversations = parseAllMessageEntityToMessage(conversations);
            return dispatch({
                type: types.SETUP_CONVERSATIONS,
                conversations: conversations
            });
        })
        .catch((err) => {
            console.log("Fail to get conversation: " + err)
            Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
        });
};

export const setConversation = (conversation) => {
    return {
        type: types.ADD_CONVERSATION,
        conversation: conversation
    }
}

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
                type: types.INIT_CONVERSATION,
                incomingMessages: incomingMessages,
                conversation: conversation,
                conId: conId
            })
        });
}

export const incomingMessage = (conversation, incomingMessages) => (dispatch) => {
    console.log(conversation)
    conversation.messages = [...incomingMessages, ...conversation.messages];
    return dispatch({
        type: types.MESSAGE_INCOMING,
        incomingMessages: incomingMessages,
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
