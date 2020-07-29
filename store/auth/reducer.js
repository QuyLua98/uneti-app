import * as types from "./types";

const defaultState = {
    signedIn: null,
    username: "",
    userId: "",
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
                userId: action.payload.userId,
                token: action.payload.token,
                error: "",
                authFailure: false
            };
        case types.AUTHENTICATION_FAILURE:
            return {
                signedIn: false,
                username: "",
                userId: "",
                token: "",
                error: action.payload.error,
                authFailure: true
            };
        case types.LOGGED_OUT:
            return {
                signedIn: false,
                username: "",
                userId: "",
                token: "",
                error: "",
                authFailure: false
            };
        default:
            return state;
    }
};