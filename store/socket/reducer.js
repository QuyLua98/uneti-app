import * as types from "./types";
import MessageStatus from "../../screens/chatting/components/MessageStatus";
import MessageType from "../../screens/chatting/components/MessageType";

const defaultState = {
    loaded: false,
    messages: "",
    connected: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SOCKETS_CONNECTING:
            return {
                loaded: true,
                message: "Connecting...",
                connected: false
            };
        case types.SOCKETS_CONNECTED:
            return {
                loaded: true,
                message: "Connected",
                connected: true
            };
        case types.SOCKETS_DISCONNECTING:
            return {
                loaded: true,
                message: "Disconnecting...",
                connected: true
            };
        case types.SOCKETS_DISCONNECTED:
            return {
                loaded: true,
                message: "Disconnected",
                connected: false
            };
        default:
            return state;
    }
};
