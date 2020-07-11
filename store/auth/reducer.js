import * as types from "./types";

const defaultState = {
    signedIn: null,
    username: "",
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
                token: action.payload.token,
                error: "",
                authFailure: false
            };
        case types.AUTHENTICATION_FAILURE:
            return {
                signedIn: false,
                username: "",
                token: "",
                error: action.payload.error,
                authFailure: true
            };
        case types.LOGGED_OUT:
            return {
                signedIn: false,
                username: "",
                token: "",
                error: "",
                authFailure: false
            };
        default:
            return state;
    }
};