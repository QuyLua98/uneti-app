import {Body, Left, ListItem, Right} from "native-base";
import {Text} from "react-native";
import React, {Component} from "react";
import AvatarIcon from "./AvatarIcon";
import Colors from "../../../constants/Colors";
import ConversationType from "../../../constants/ConversationType";
import {connect} from 'react-redux';

class ChatItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        const currentUserId = this.props.auth.userId;
        const {type, users, lastMessage, messages, conId} = this.props;
        if(lastMessage === null || lastMessage === undefined) {
            return <></>
        }
        let user;
        switch (type) {
            case ConversationType.PRIVATE:
                user = users.find(u => u.id !== currentUserId)
                break;
            case ConversationType.GROUP:
                break;
            default:
                return <></>
        }

        return (
            <ListItem avatar button={true}
                      onPress={() => {
                          this.props.onClick(user.id, user.username, conId, messages)
                      }}>
                <Left>
                    <AvatarIcon userId={user.id} isActive={true} />
                </Left>
                <Body style={{borderColor: Colors.white}}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>{user.fullName}</Text>
                    <Text note>{lastMessage.userSentId === user.id ? lastMessage.content : "Bạn: " + lastMessage.content}</Text>
                </Body>
                <Right style={{borderColor: Colors.white, marginTop: 10}}>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ChatItemBox);