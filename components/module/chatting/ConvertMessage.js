import MessageStatus from "../../../screens/chatting/components/MessageStatus";
import MessageType from "../../../screens/chatting/components/MessageType";
import {getURIAvatarFromUserId} from "../../../screens/chatting/components/Utils";
import moment from "moment";
import {randomUUID} from "../../../utils/UUID";

export const messageToEntity = (message, userId, username, conId) => {
    return {
        status: MessageStatus.PENDING,
        type: MessageType.TEXT,
        content: message.text,
        sendToUserId: userId,
        sendToUsername: username,
        conId: conId,
        createdDate: message.createdAt
    }
}

export const entityToMessage = (entity) => {
    return {
        _id: randomUUID(),
        text: entity.content,
        createdAt: moment(entity.createdDate),
        user: {
            _id: entity.userSentId,
            avatar: getURIAvatarFromUserId(entity.userSentId),
        },
    }
}