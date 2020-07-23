import * as types from "./types";

const defaultState = {
    loaded: false,
    messages: [
        {
            _id: 2,
            text: 'Cô chào em',
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        {
            _id: 1,
            text: 'Em chào cô',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/p960x960/93847319_2911476228966460_5257273603640000512_o.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=g14vDyz1QIYAX8cyuzR&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=1a956dda69f3063160574f497c5f1025&oe=5F3E8D24',
            },
        },
    ],
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
        case types.SOCKETS_MESSAGE_SENDING:
            return {
                loaded: true,
                message: action.messageSend,
                connected: true
            };
        case types.SOCKETS_MESSAGE_RECEIVING:
            return {
                loaded: true,
                message: action.messageReceive,
                connected: true
            };
        default:
            return state;
    }
};
