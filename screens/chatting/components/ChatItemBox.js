import {Body, Left, ListItem, Right, Thumbnail} from "native-base";
import {Text} from "react-native";
import React, {Component} from "react";
import AvatarIcon from "./AvatarIcon";
import Colors from "../../../constants/Colors";

export default class ChatItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        const {user, lastMessage, messageCache, conId} = this.props;
        if(lastMessage === null || lastMessage === undefined) {
            return <></>
        }
        return (
            <ListItem avatar button={true}
                      onPress={() => {
                          this.props.onClick(user.id, user.username, conId, messageCache)
                      }}>
                <Left>
                    {/*<Thumbnail source={require('../../../assets/images/chatting/avatar/avatar-quy.jpg')}/>*/}
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