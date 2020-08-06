import {Config} from "../../../config";

export const getURIAvatarFromUserId = (userId) => {
    return `${Config.CHAT_DOMAIN}/api/user/${userId}/avatar`;
}