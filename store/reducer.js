import { combineReducers } from "redux";
import chatting from "./chat/reducer";
import auth from "./auth/reducer";
import user from "./user/reducer";

export default combineReducers({
    chatting, auth, user
});
