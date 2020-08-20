import * as types from "./types";

export const toggle = (data) => {
    return {
        type: types.TOGGLE,
        payload: data
    };
};

export const subscribeUsersStatus = () => {
    return {
        type: types.USER_STATUS_SUBSCRIBE
    }
}
