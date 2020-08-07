import * as types from "./types";

const defaultState = {
    conId: "",
    messages: "",
    userIdReceive: "",
    usernameReceive: "",
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SETUP_CHAT_BOX:
            return {
                conId: action.conId,
                messages: action.messages,
                userIdReceive: action.userIdReceive,
                usernameReceive: action.usernameReceive,
            }
        case types.MESSAGE_INCOMING:
            return {
                conId: state.conId,
                messages: [...action.incomingMessages, ...state.messages],
                userIdReceive: state.userIdReceive,
                usernameReceive: state.usernameReceive,
            }
        default:
            return state;
    }
};
