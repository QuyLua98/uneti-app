import {Config} from "../../../config";

export const getURIAvatarFromUserId = (userId) => {
    return `${Config.API_URL}/api/user/${userId}/avatar`;
}