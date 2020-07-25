import { combineReducers } from "redux";
import chatting from "./chat/reducer";
import auth from "./auth/reducer";

export default combineReducers({
    chatting, auth
});
