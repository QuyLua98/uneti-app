import * as chattingAction from "../../store/chat/action";
import * as types from "../../store/chat/types";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ENDPOINT_BROKER, JWT_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";
import {AsyncStorage} from "react-native";
import {_retrieveAsyncStorageData} from "../../components/AsyncStorageUtils";


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
        store.dispatch(chattingAction.socketsMessageReceiving(message.body));
    };


    switch (action.type) {
        case types.SOCKETS_CONNECT:
            // if (stompClient !== null) {
            //     store.dispatch(chattingAction.socketsDisconnecting());
            //     stompClient.deactivate();
            //     store.dispatch(chattingAction.socketsDisconnected());
            // }
            // store.dispatch(chattingAction.socketsConnecting);
            //
            // // const token =  _retrieveAsyncStorageData(JWT_TOKEN);
            // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjEsXCJ1c2VybmFtZVwiOlwicXV5bHVhXCJ9IiwiaWF0IjoxNTk0NDU1NjI0LCJleHAiOjE1OTUzMTk2MjR9.0trseE_5ME6KMbTin2uaTDqqhu6ENDC_skSCfaOsaoU";
            // const wsURL = `${Config.API_URL}/ws?${JWT_TOKEN}=${token}`;
            // stompClient = new Client();
            //
            // stompClient.webSocketFactory = function () {
            //     return new SockJS(wsURL);
            // };
            //
            // stompClient.configure({
            //     onConnect: () => {
            //         store.dispatch(chattingAction.socketsConnected());
            //         stompClient.subscribe(ENDPOINT_BROKER, onSubscribeMessage);
            //     },
            //     debug: (str) => {
            //         console.log(new Date(), str);
            //     }
            // });
            // stompClient.activate();
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
                body: action.payload.data
            });
            store.dispatch(chattingAction.socketsMessageSending(action.payload.data));
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
