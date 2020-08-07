import { combineReducers } from "redux";
import chat from "./chat/reducer";
import auth from "./auth/reducer";
import user from "./user/reducer";
import socket from "./socket/reducer";

export default combineReducers({
    chat, auth, user, socket
});
