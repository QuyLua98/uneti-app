import {Body, Left, ListItem, Right, Thumbnail} from "native-base";
import {Text} from "react-native";
import React, {Component} from "react";

export default class ChatItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRemember: false,
            isLoading: false,
            isLoadingToken: false,
        }
    }

    render() {
        return (
            <ListItem avatar button={true}
                      onPress={() => {
                          this.handleClick()
                      }}>
                <Left>
                    <Thumbnail source={require('../../../assets/images/chatting/avatar/account-female.png')}/>
                </Left>
                <Body>
                    <Text>Kumar</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>
        )
    }
}