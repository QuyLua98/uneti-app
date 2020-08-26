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

/* userSentId */
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

export const entityToConversation = (entity) => {
    return {
        id: entity.id,
        code: entity.code,
        name: entity.name,
        type: entity.type,
        createdDate: entity.createdDate,
        userCreatedId: entity.userCreatedId,
        thumbnail: entity.thumbnail,
        userInCon: entity.userInCon,
        messages: [],
    }
}