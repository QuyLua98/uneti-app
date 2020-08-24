import * as chattingAction from "../../store/chat/action";
import * as socketAction from "../../store/socket/action";
import * as userAction from "../../store/user/action";
import * as chattingTypes from "../../store/chat/types";
import * as socketTypes from "../../store/socket/types";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ENDPOINT_BROKER, ENDPOINT_USER_STATUS_BROKER, JWT_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";
import {entityToMessage} from "../../components/module/chatting/ConvertMessage";
import {Utf8ArrayToJson} from "../../utils/StringUtils";


let stompClient = null;

export const wsMiddleware = store => next => action => {

    const onSubscribeMessage = message => {
        const state = store.getState();
        const {conversations} = state.chat;
        const messages = [];
        message = Utf8ArrayToJson(message._binaryBody);
        messages.push(entityToMessage(message));
        let conversation = conversations.find(c => c.conId === message.conId);
        if (conversation != null) {
            store.dispatch(chattingAction.incomingMessage(conversation, messages));
        } else {
            store.dispatch(chattingAction.initConversation(message.conId, messages));
        }
    };

    const toggleUser = data => {
        data = Utf8ArrayToJson(data._binaryBody);
        store.dispatch(userAction.toggle(data));
    }

    switch (action.type) {
        case socketTypes.SOCKETS_CONNECT:
            if (stompClient !== null) {
                store.dispatch(socketAction.socketsDisconnecting());
                stompClient.deactivate();
                store.dispatch(socketAction.socketsDisconnected());
            }
            store.dispatch(socketAction.socketsConnecting);

            const wsURL = `${Config.CHAT_DOMAIN}/ws?${JWT_TOKEN}=${action.payload.token}`;
            stompClient = new Client();
            stompClient.webSocketFactory = function () {
                return new SockJS(wsURL);
            };

            stompClient.configure({
                onConnect: () => {
                    store.dispatch(socketAction.socketsConnected());
                    stompClient.subscribe(ENDPOINT_BROKER, onSubscribeMessage);
                    stompClient.subscribe(ENDPOINT_USER_STATUS_BROKER, toggleUser);
                },
                debug: (str) => {
                    console.log(new Date(), str);
                },
                reconnectDelay: 30000
            });
            stompClient.activate();
            break;
        case socketTypes.SOCKETS_DISCONNECT:
            if (stompClient !== null) {
                stompClient.forceDisconnect();
            }
            stompClient = null;
            store.dispatch(socketAction.socketsDisconnected());
            break;
        case chattingTypes.MESSAGE_SEND:
            stompClient.publish({
                destination: action.payload.api,
                body: JSON.stringify(action.payload.data)
            });
            break;
        default:
            return next(action);
    }
};
