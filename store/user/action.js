import * as types from "./types";

export const toggle = (data) => {
    return {
        type: types.TOGGLE,
        payload: data
    };
};