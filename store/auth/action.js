import * as types from "./types";
import axios from "axios";
import {
    _removeAsyncStorageData,
    _storeAsyncStorageData
} from "../../components/AsyncStorageUtils";
import {JWT_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";
import {Alert} from "react-native";

export const setToken = (token) => {
    return {
        type: types.FETCH_TOKEN,
        token: token
    };
};

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


export function login(username, password, isRemember) {
    return async dispatch => {
        const credentials = {username, password};
        await axios
            .post(`${Config.CHAT_DOMAIN}/api/login`, credentials)
            .then(success => {
                const token = success.data;
                if (isRemember) {
                    _storeAsyncStorageData(JWT_TOKEN, token).then(() => console.log("Saved token to storage"));
                }
                dispatch(getUserProfile(token));
            }).catch(error => {
                Alert.alert("Lỗi", "Sai tên tài khoản hoặc mật khẩu.");
                dispatch(
                    loginError({
                        signedIn: false,
                        username: "",
                        userId: "",
                        token: "",
                        error: error,
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
    return async dispatch => {
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`
        };
        await axios
            .get(`${Config.CHAT_DOMAIN}/api/user/profile`, {headers})
            .then(res => {
                dispatch(
                    loggedIn({
                        signedIn: true,
                        username: res.data.fullName,
                        userId: res.data.id,
                        token: token,
                        error: "",
                        authFailure: false
                    })
                );
            })
            .catch(error => {
                if (error.response) {
                    dispatch(loggedOut());
                }
            });
    };
};


