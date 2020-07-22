import {Config} from "../config";

export const SESSION_ASP = "session-asp";
export const CODE_SEARCH = "code-search";
export const EGOV_TOKEN = ".ASPXAUTH";
export const JWT_TOKEN = "Authorization";
export const JWT_PREFIX = "Bearer";
export const ENDPOINT_BROKER = `${Config.API_URL}/user/queue/reply`;
// export const ENDPOINT_SEND_MESSAGE = `${Config.API_URL}/app/chat.sendMessage`;
export const ENDPOINT_SEND_MESSAGE = `/app/chat.sendMessage`;