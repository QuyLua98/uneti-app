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
        case types.MESSAGE_SENDING:
            return {
                message: action.messageSend,
            }
        case types.MESSAGE_RECEIVING:
            return {
                message: action.messageReceive,
            }
        default:
            return state;
    }
};
