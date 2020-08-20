import * as types from "./types";

const defaultState = {
    users: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.TOGGLE:
            return {
                users: action.payload
            };
        default:
            return state;
    }
};
