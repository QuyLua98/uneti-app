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
                conversations: action.conversations != null ? action.conversations : [],
                conId: action.conId,
                messages: action.messages,
                userIdReceive: action.userIdReceive,
                usernameReceive: action.usernameReceive,
            }
        case types.MESSAGE_INCOMING:
            return {
                conversations: action.conversations != null ? action.conversations : [],
                conId: state.conId,
                messages: [...action.incomingMessages, ...state.messages],
                userIdReceive: state.userIdReceive,
                usernameReceive: state.usernameReceive,
            }
        default:
            return state;
    }
};
