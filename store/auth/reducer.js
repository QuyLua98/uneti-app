import * as types from "./types";

const defaultState = {
    signedIn: null,
    username: "",
    avatar: "",
    token: "",
    error: "",
    authFailure: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.AUTHENTICATED:
            return {
                signedIn: true,
                username: action.payload.username,
                avatar: action.payload.avatar,
                token: action.payload.token,
                error: "",
                authFailure: false
            };
        case types.AUTHENTICATION_FAILURE:
            return {
                signedIn: false,
                username: "",
                avatar: "",
                token: "",
                error: action.payload.error,
                authFailure: true
            };
        case types.LOGGED_OUT:
            return {
                signedIn: false,
                username: "",
                avatar: "",
                token: "",
                error: "",
                authFailure: false
            };
        default:
            return state;
    }
};