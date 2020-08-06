import * as chattingAction from "../../store/chat/action";
import * as types from "../../store/chat/types";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ENDPOINT_BROKER, JWT_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";
import MessageStatus from "../../screens/chatting/components/MessageStatus";
import MessageType from "../../screens/chatting/components/MessageType";
import {messageToEntity} from "../../components/module/chatting/ConvertMessage";
import ChattingBoxScreen from "../../screens/chatting/ChattingBoxScreen";


let stompClient = null;
let subscription = null;

export const wsMiddleware = store => next => action => {
    // const onSingleMessage = message => {
    //     // Parse the JSON message received on the websocket
    //     store.dispatch(chattingAction.socketsMessageReceiving(message.body));
    //     //Can parse the incoming message and dispatch to the appropriate destination at this point
    //     store.dispatch({
    //         type: types.SOCKETS_MESSAGE_RECEIVE,
    //         payload: message.body
    //     });
    //
    //     subscription.unsubscribe();
    //     subscription = null;
    // };

    const onSubscribeMessage = message => {
        // Parse the JSON message received on the websocket
        ChattingBoxScreen.onReceive(message);
        store.dispatch(chattingAction.socketsMessageReceiving(message.body));
    };

    switch (action.type) {
        case types.SOCKETS_CONNECT:
            console.log("connecting")
            if (stompClient !== null) {
                store.dispatch(chattingAction.socketsDisconnecting());
                stompClient.deactivate();
                store.dispatch(chattingAction.socketsDisconnected());
            }
            store.dispatch(chattingAction.socketsConnecting);

            const wsURL = `${Config.CHAT_DOMAIN}/ws?${JWT_TOKEN}=${action.payload.token}`;
            stompClient = new Client();
            stompClient.reconnectDelay = 15000;
            stompClient.webSocketFactory = function () {
                return new SockJS(wsURL);
            };

            stompClient.configure({
                onConnect: () => {
                    store.dispatch(chattingAction.socketsConnected());
                    stompClient.subscribe(ENDPOINT_BROKER, onSubscribeMessage);
                },
                debug: (str) => {
                    console.log(new Date(), str);
                }
            });
            stompClient.activate();
            break;
        case types.SOCKETS_DISCONNECT:
            if (stompClient !== null) {
                stompClient.forceDisconnect();
            }
            stompClient = null;
            store.dispatch(chattingAction.socketsDisconnected());
            break;
        case types.SOCKETS_MESSAGE_SEND:
            stompClient.publish({
                destination: action.payload.api,
                body: JSON.stringify(action.payload.data)
            });
            // store.dispatch(chattingAction.socketsMessageSending(action.payload.data));
            break;
        case types.SOCKETS_MESSAGE_SUBSCRIBE:
            if (stompClient) {
                subscription = stompClient.subscribe(
                    action.payload.subscribe,
                    onSubscribeMessage
                );
            }
            break;
        default:
            return next(action);
    }
};
