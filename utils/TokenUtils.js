import {JWT_TOKEN} from "../constants/Constants";
import axios from "axios";
import {Config} from "../config";

export const isValidToken = async (token) => {
    let headers = {
        [JWT_TOKEN]: `Bearer ${token}`
    };
    return await axios
        .get(`${Config.CHAT_DOMAIN}/api/isAuthenticated`, {headers})
        .then(res => {
            return res.data;
        })
        .catch(() => {
            return false;
        });
}
