import * as types from "./types";
import MessageStatus from "../../screens/chatting/components/MessageStatus";
import MessageType from "../../screens/chatting/components/MessageType";

const defaultState = {
    users: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.TOGGLE:
            return {
                users: action.payload
            };
        default:
            return state;
    }
};
