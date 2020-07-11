import * as types from "./types";
import axios from "axios";
import {
    _removeAsyncStorageData,
    _storeAsyncStorageData
} from "../../components/AsyncStorageUtils";
import {JWT_PREFIX, JWT_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";

export const loggedIn = (data) => {
    return {
        type: types.AUTHENTICATED,
        payload: data
    };
};

export const loginError = (data) => {
    return {
        type: types.AUTHENTICATION_FAILURE,
        payload: data
    };
};

export const loggedOut = () => {
    return {type: types.LOGGED_OUT};
};


export function login(username, password) {
    return dispatch => {
        const credentials = {username, password};
        axios
            .post(`${Config.API_URL}/api/login`, credentials)
            .then(success => {
                const token = success.data;
                _storeAsyncStorageData(JWT_TOKEN, token).then(() => console.log("Saved token to storage"));
                this.getUserProfile(token);
            })
            .catch(error => {
                dispatch(
                    loginError({
                        signedIn: false,
                        username: "",
                        token: "",
                        error: error.response.data,
                        authFailure: true
                    })
                );
            });
    };
}

export const logout = () => {
    return dispatch => {
        _removeAsyncStorageData(JWT_TOKEN).then(() => console.log("Remove token from storage"));
        dispatch(loggedOut());
    };
};

export const getUserProfile = (token) => {
    return dispatch => {
        let headers = {
            [JWT_TOKEN]: `${JWT_PREFIX + " " + token}`
        };
        axios
            .get(`${Config.API_URL}/api/user/profile`, {headers})
            .then(res => {
                dispatch(
                    loggedIn({
                        signedIn: true,
                        username: res.data.fullName,
                        token: token,
                        error: "",
                        authFailure: false
                    })
                );
            })
            .catch(error => {
                if (error.response) {
                    console.log("catch validate " + error);
                    dispatch(loggedOut());
                }
            });
    };
};
