import * as types from "./types";
import {JWT_TOKEN} from "../../constants/Constants";
import axios from "axios";
import {Config} from "../../config";
import {Alert} from "react-native";

export const toggle = (data) => {
    return {
        type: types.TOGGLE,
        payload: data
    };
};

export const fetchUsers = (token) => {
    return dispatch => {
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        axios
            .get(Config.CHAT_DOMAIN + `/api/user/`, {headers})
            .then(res => {
                const users = res.data;
                dispatch(toggle(users))
            })
            .catch((err) => {
                console.log(err)
                Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
            });
    }
}