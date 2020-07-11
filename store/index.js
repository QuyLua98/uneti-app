import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducer";
import {wsMiddleware} from "../modules/websocket/wsMiddleware";

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk, wsMiddleware)
);

export default store;