import {Body, Left, ListItem, Right, Thumbnail} from "native-base";
import {Text} from "react-native";
import React, {Component} from "react";
import AvatarIcon from "./AvatarIcon";

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
                          this.props.onClick()
                      }}>
                <Left>
                    {/*<Thumbnail source={require('../../../assets/images/chatting/avatar/avatar-quy.jpg')}/>*/}
                    <AvatarIcon isActive={true} />
                </Left>
                <Body>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Nguyễn Duy Quý</Text>
                    <Text note>Bạn: Cô chào em</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>
        )
    }
}