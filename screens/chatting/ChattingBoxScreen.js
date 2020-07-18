import React, {Component} from "react";

import {connect} from 'react-redux';

import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView
} from "react-native";
import {
    Container,
    Body,
    Content,
    Button,
    Header,
    Icon,
    Left,
    Right,
    List,
    Title,
    ListItem,
    Thumbnail
} from 'native-base';
import {DrawerActions} from "@react-navigation/native";
import {GiftedChat} from 'react-native-gifted-chat';
import {socketsMessageSend} from "../../store/chat/action";

class ChattingBox extends Component {
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

    onSend = (messages) => {

        alert(messages);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                            }}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chat</Title>
                    </Body>
                    <Right/>
                </Header>
                    <GiftedChat
                        messages={this.props.chatting.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
            </Container>
        );
    };
};

const mapStateToProps = state => ({
    chatting: state.chatting
});
const mapDispatchToProps = { socketsMessageSend };
export default connect(mapStateToProps, mapDispatchToProps)(ChattingBox);

const styles = StyleSheet.create({})
