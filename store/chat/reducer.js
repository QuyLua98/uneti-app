import * as types from "./types";

const defaultState = {
    conversations: [],
    conId: "",
    messages: "",
    userIdReceive: "",
    usernameReceive: ""
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SETUP_CHAT_BOX:
            return {
                conversations: state.conversations != null ? state.conversations : [],
                conId: action.conId,
                messages: action.messages,
                userIdReceive: action.userIdReceive,
                usernameReceive: action.usernameReceive,
            }
        case types.SETUP_CONVERSATIONS:
            return {
                conversations: action.conversations != null ? action.conversations : [],
                conId: state.conId,
                messages: state.messages,
                userIdReceive: state.userIdReceive,
                usernameReceive: state.usernameReceive,
            }
        case types.MESSAGE_INCOMING:
            return {
                conversations: action.conversations != null ? action.conversations : state.conversations,
                conId: state.conId,
                messages: [...action.incomingMessages, ...state.messages],
                userIdReceive: state.userIdReceive,
                usernameReceive: state.usernameReceive,
            }
        case types.INIT_CONVERSATION:
            return {
                conversations: action.conversation != null ? [...state.conversations, action.conversation] : state.conversations,
                conId: action.conId,
                messages: action.incomingMessages,
                userIdReceive: state.userIdReceive,
                usernameReceive: state.usernameReceive,
            }
        default:
            return state;
    }
};
